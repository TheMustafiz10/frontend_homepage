import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaMapMarkerAlt, FaTimes, FaHistory,
  FaStar, FaTruck, FaRecycle, FaFilter, FaSlidersH
} from 'react-icons/fa';
import { useAppContext } from '../Context/context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    radius: 5,
    sortBy: 'relevance'
  });
  
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { search, location: userLocation } = useAppContext();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        setLoading(true);
        try {
          const searchResults = await search(query, filters);
          setResults(searchResults);
          
          // Save to recent searches
          const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
          setRecentSearches(updated);
          localStorage.setItem('recentSearches', JSON.stringify(updated));
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose?.();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch({ preventDefault: () => {} });
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'collector': return <FaTruck className="text-secondary-500" />;
      case 'recycler': return <FaRecycle className="text-primary-500" />;
      case 'location': return <FaMapMarkerAlt className="text-accent-500" />;
      default: return <FaSearch className="text-gray-400" />;
    }
  };

  return (
    <motion.div
      ref={searchRef}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden mt-2"
    >
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center">
          <div className="flex-1 flex items-center px-4">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for collectors, recyclers, locations..."
              className="w-full px-4 py-4 outline-none text-gray-700 placeholder-gray-400"
              autoFocus
            />
          </div>
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 hover:bg-gray-100 rounded-full mr-2"
            >
              <FaTimes className="text-gray-500" />
            </button>
          )}
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 mr-2 rounded-lg transition-colors ${
              showFilters ? 'bg-primary-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <FaSlidersH />
          </button>
          
          <button
            type="submit"
            className="bg-primary-500 text-white px-6 py-3 rounded-r-lg hover:bg-primary-600 transition-colors font-medium"
          >
            Search
          </button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All</option>
                      <option value="collector">Collectors</option>
                      <option value="recycler">Recyclers</option>
                      <option value="location">Locations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      placeholder="Enter location"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Radius (km)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={filters.radius}
                      onChange={(e) => setFilters({ ...filters, radius: e.target.value })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1km</span>
                      <span>{filters.radius}km</span>
                      <span>50km</span>
                    </div>
                  </div>
                </div>

                {userLocation && (
                  <button
                    onClick={() => setFilters({ ...filters, location: 'current' })}
                    className="mt-3 text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                  >
                    <FaMapMarkerAlt />
                    <span>Use my current location</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Search Results / Suggestions */}
      <AnimatePresence>
        {(loading || results.length > 0 || recentSearches.length > 0) && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="border-t border-gray-100 max-h-96 overflow-y-auto"
          >
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-500"></div>
                <p className="mt-2 text-gray-500">Searching...</p>
              </div>
            ) : (
              <div className="p-2">
                {/* Recent Searches */}
                {!query && recentSearches.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                      Recent Searches
                    </h3>
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(search)}
                        className="flex items-center space-x-3 w-full px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <FaHistory className="text-gray-400" />
                        <span className="text-gray-700">{search}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Search Results */}
                {results.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                      Results ({results.length})
                    </h3>
                    {results.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          navigate(result.link);
                          onClose?.();
                        }}
                        className="flex items-center justify-between px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            {getIconForType(result.type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{result.name}</p>
                            <p className="text-sm text-gray-500">{result.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result.rating && (
                            <div className="flex items-center space-x-1">
                              <FaStar className="text-yellow-400 text-xs" />
                              <span className="text-sm text-gray-600">{result.rating}</span>
                            </div>
                          )}
                          {result.distance && (
                            <span className="text-sm text-gray-500">
                              {result.distance.toFixed(1)}km
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {query && results.length === 0 && !loading && (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No results found for "{query}"</p>
                    <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;