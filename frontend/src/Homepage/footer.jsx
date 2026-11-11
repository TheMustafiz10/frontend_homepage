import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaRecycle, FaFacebook, FaTwitter, FaInstagram, 
  FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, 
  FaEnvelope, FaArrowUp, FaHeart, FaLeaf, FaHandsHelping
} from 'react-icons/fa';
import { useAppContext } from '../Context/context';

const Footer = () => {
  const { language } = useAppContext();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us', path: '/about' },
      { name: language === 'bn' ? 'কিভাবে কাজ করে' : 'How It Works', path: '/how-it-works' },
      { name: language === 'bn' ? 'ক্যারিয়ার' : 'Careers', path: '/careers' },
      { name: language === 'bn' ? 'প্রেস' : 'Press', path: '/press' },
    ],
    services: [
      { name: language === 'bn' ? 'বর্জ্য সংগ্রহ' : 'Waste Collection', path: '/services/collection' },
      { name: language === 'bn' ? 'রিসাইক্লিং' : 'Recycling', path: '/services/recycling' },
      { name: language === 'bn' ? 'পরামর্শ' : 'Consultancy', path: '/services/consultancy' },
      { name: language === 'bn' ? 'প্রশিক্ষণ' : 'Training', path: '/services/training' },
    ],
    resources: [
      { name: language === 'bn' ? 'ব্লগ' : 'Blog', path: '/blog' },
      { name: language === 'bn' ? 'শিক্ষা উপকরণ' : 'Educational Resources', path: '/resources' },
      { name: language === 'bn' ? 'গাইড' : 'Guides', path: '/guides' },
      { name: language === 'bn' ? 'প্রশ্নোত্তর' : 'FAQ', path: '/faq' },
    ],
    legal: [
      { name: language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy', path: '/privacy' },
      { name: language === 'bn' ? 'পরিষেবার শর্তাবলী' : 'Terms of Service', path: '/terms' },
      { name: language === 'bn' ? 'কুকি নীতি' : 'Cookie Policy', path: '/cookies' },
      { name: language === 'bn' ? 'অভিযোগ নীতি' : 'Complaint Policy', path: '/complaints' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/porichhonno', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: 'https://twitter.com/porichhonno', color: 'hover:text-blue-400' },
    { icon: FaInstagram, href: 'https://instagram.com/porichhonno', color: 'hover:text-pink-600' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/porichhonno', color: 'hover:text-blue-700' },
    { icon: FaYoutube, href: 'https://youtube.com/porichhonno', color: 'hover:text-red-600' },
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: 'House 12, Road 5, Mirpur 10, Dhaka 1216, Bangladesh' },
    { icon: FaPhone, text: '+880 1712-345678' },
    { icon: FaEnvelope, text: 'info@porichhonno.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Wave SVG at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16 fill-current text-gray-900"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* Main Footer */}
      <div className="container-custom pt-20 pb-12">
        {/* Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center"
              >
                <FaRecycle className="text-white text-xl" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Porichhonno
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              {language === 'bn' 
                ? 'পরিচ্ছন্ন বাংলাদেশ গড়ার লক্ষ্যে আমাদের যাত্রা। আমরা বর্জ্য ব্যবস্থাপনার মাধ্যমে পরিবেশ রক্ষা ও সম্পদ সৃষ্টিতে কাজ করছি।'
                : 'Our journey to build a clean Bangladesh. We work to protect the environment and create resources through waste management.'}
            </p>
            
            {/* Stats */}
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">50K+</div>
                <div className="text-xs text-gray-400">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">100K+</div>
                <div className="text-xs text-gray-400">Pickups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">500+</div>
                <div className="text-xs text-gray-400">Collectors</div>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-white mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact and Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-gray-800">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {language === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
            </h3>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <item.icon className="text-primary-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {language === 'bn' ? 'সামাজিক যোগাযোগ' : 'Follow Us'}
            </h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">
                {language === 'bn' ? 'আপডেট পেতে সাবস্ক্রাইব করুন' : 'Subscribe for updates'}
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary-500 text-white"
                />
                <button className="px-4 py-2 bg-primary-500 text-white rounded-r-lg hover:bg-primary-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            © {currentYear} Porichhonno. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত' : 'All rights reserved.'}
          </p>
          <p className="flex items-center space-x-1 mt-2 md:mt-0">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>for a cleaner Bangladesh</span>
            <FaLeaf className="text-primary-500 ml-1" />
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center z-50"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;