import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  FaRecycle, FaTruck, FaLeaf, FaHandHoldingHeart,
  FaChartLine, FaUsers, FaStar, FaAward, FaClock,
  FaShieldAlt, FaHandsHelping, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../Context/context';
import Header from './header';
import Footer from './footer';
import MapComponent from '../Components/MapComponent';

const Homepage = () => {
  const { language, location, wasteStats } = useAppContext();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const stats = [
    {
      icon: FaRecycle,
      value: '50,000+',
      label: language === 'bn' ? 'কেজি বর্জ্য পুনর্ব্যবহার' : 'kg Waste Recycled',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: FaTruck,
      value: '25,000+',
      label: language === 'bn' ? 'সফল সংগ্রহ' : 'Successful Pickups',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: FaUsers,
      value: '10,000+',
      label: language === 'bn' ? 'সক্রিয় ব্যবহারকারী' : 'Active Users',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: FaLeaf,
      value: '100,000+',
      label: language === 'bn' ? 'কেজি CO₂ সাশ্রয়' : 'kg CO₂ Saved',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const features = [
    {
      icon: FaHandsHelping,
      title: language === 'bn' ? 'টোকাই ক্ষমতায়ন' : 'Tokai Empowerment',
      description: language === 'bn' 
        ? 'টোকাই ভাইদের সম্মানজনক আয় ও ডিজিটাল পরিচয়' 
        : 'Respectful income and digital identity for Tokai workers',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: FaShieldAlt,
      title: language === 'bn' ? 'নিরাপদ লেনদেন' : 'Secure Transactions',
      description: language === 'bn'
        ? 'এসক্রো পেমেন্ট সিস্টেমে নিশ্চিত টাকা'
        : 'Guaranteed payments through escrow system',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: FaChartLine,
      title: language === 'bn' ? 'পরিবেশগত প্রভাব' : 'Environmental Impact',
      description: language === 'bn'
        ? 'রিয়েল-টাইম CO₂ সাশ্রয় ট্র্যাকিং'
        : 'Real-time CO₂ savings tracking',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: FaAward,
      title: language === 'bn' ? 'গ্যামিফিকেশন' : 'Gamification',
      description: language === 'bn'
        ? 'ব্যাজ ও পয়েন্ট দিয়ে উৎসাহ'
        : 'Motivation through badges and points',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: language === 'bn' ? 'রেজিস্টার করুন' : 'Register',
      description: language === 'bn'
        ? 'আপনার অ্যাকাউন্ট তৈরি করুন এবং প্রোফাইল সম্পূর্ণ করুন'
        : 'Create your account and complete your profile',
      icon: '📝'
    },
    {
      step: 2,
      title: language === 'bn' ? 'বর্জ্য স্ক্যান করুন' : 'Scan Waste',
      description: language === 'bn'
        ? 'এআই দিয়ে বর্জ্যের ধরন ও মূল্য নির্ধারণ করুন'
        : 'Identify waste type and value with AI',
      icon: '📱'
    },
    {
      step: 3,
      title: language === 'bn' ? 'পিকআপ শিডিউল করুন' : 'Schedule Pickup',
      description: language === 'bn'
        ? 'আপনার সুবিধামত সময়ে সংগ্রহ নির্ধারণ করুন'
        : 'Schedule collection at your convenience',
      icon: '📅'
    },
    {
      step: 4,
      title: language === 'bn' ? 'আয় করুন' : 'Earn Money',
      description: language === 'bn'
        ? 'বর্জ্য থেকে আয় করুন এবং পয়েন্ট অর্জন করুন'
        : 'Earn money from waste and get points',
      icon: '💰'
    }
  ];

  const testimonials = [
    {
      name: 'করিম মিয়া',
      role: language === 'bn' ? 'টোকাই কালেক্টর' : 'Tokai Collector',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      quote: language === 'bn'
        ? 'পূর্বে প্রতিদিন ২০০ টাকা আয় হতো, এখন ৬০০ টাকার বেশি। পরিচ্ছন্নতা আমার সম্মান বাড়িয়েছে।'
        : 'Previously earned 200 taka daily, now over 600 taka. Porichhonno has increased my dignity.',
      rating: 5
    },
    {
      name: 'রহিমা বেগম',
      role: language === 'bn' ? 'গৃহস্থ' : 'Household',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      quote: language === 'bn'
        ? 'আমার বর্জ্য এখন আয়ের উৎস। মাসে ৫০০-১০০০ টাকা বাড়তি আয় হয়।'
        : 'My waste is now a source of income. I earn 500-1000 taka extra monthly.',
      rating: 5
    },
    {
      name: 'শাহিদুল ইসলাম',
      role: language === 'bn' ? 'রিসাইক্লার' : 'Recycler',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      quote: language === 'bn'
        ? 'মানসম্মত বর্জ্য সরাসরি সংগ্রহ করায় খরচ কমেছে ও মান বেড়েছে।'
        : 'Direct collection of quality waste has reduced costs and improved quality.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        {/* Animated Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {language === 'bn' ? 'পরিচ্ছন্নতা,' : 'Cleanliness,'}
                </span>
                <br />
                <span className="text-gray-900">
                  {language === 'bn' ? 'প্রযুক্তি, প্রগতি' : 'Technology, Progress'}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {language === 'bn'
                  ? 'বাংলাদেশের প্রথম ডিজিটাল বর্জ্য ব্যবস্থাপনা প্ল্যাটফর্ম যা টোকাই, গৃহস্থ ও রিসাইক্লারকে সংযুক্ত করে।'
                  : "Bangladesh's first digital waste management platform connecting Tokai, households, and recyclers."}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="btn-primary flex items-center space-x-2 group"
                >
                  <span>{language === 'bn' ? 'শুরু করুন' : 'Get Started'}</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="btn-secondary"
                >
                  {language === 'bn' ? 'কিভাবে কাজ করে' : 'How It Works'}
                </Link>
              </div>

              {/* User Stats */}
              <div className="flex items-center space-x-4 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i}.jpg`}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">10,000+</span>
                  {' '}{language === 'bn' ? 'সক্রিয় ব্যবহারকারী' : 'active users'}
                </div>
              </div>
            </motion.div>

            {/* Right Content - Map/Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-4">
                <MapComponent height="400px" showControls={false} />
                
                {/* Stats Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FaLeaf className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Today's Collection</p>
                      <p className="text-xl font-bold text-gray-900">5,245 kg</p>
                    </div>
                  </div>
                </div>

                {/* Live Activity */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">12 active collectors</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="text-center p-6">
                  <div className="inline-block p-3 bg-gray-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="text-3xl text-primary-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">
              {language === 'bn' ? 'কেন পোরিচ্ছন্ন?' : 'Why Porichhonno?'}
            </h2>
            <p className="section-subtitle">
              {language === 'bn'
                ? 'আমরা বর্জ্য ব্যবস্থাপনায় নিয়ে এসেছি ডিজিটাল বিপ্লব'
                : 'We bring a digital revolution to waste management'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">
              {language === 'bn' ? 'কিভাবে কাজ করে' : 'How It Works'}
            </h2>
            <p className="section-subtitle">
              {language === 'bn'
                ? 'চারটি সহজ ধাপে শুরু করুন আপনার যাত্রা'
                : 'Start your journey in four simple steps'}
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 hidden lg:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative text-center"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold z-10">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-4 relative z-0 border-4 border-white shadow-lg">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">
              {language === 'bn' ? 'আমাদের ব্যবহারকারীরা কী বলছেন' : 'What Our Users Say'}
            </h2>
            <p className="section-subtitle">
              {language === 'bn'
                ? 'পোরিচ্ছন্ন পরিবারের সদস্যদের অভিজ্ঞতা'
                : 'Experiences from the Porichhonno family'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'bn' 
                ? 'পরিবর্তনের অংশ হোন আজই' 
                : 'Be Part of the Change Today'}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {language === 'bn'
                ? 'যোগ দিন হাজারো মানুষের সাথে যারা ইতিমধ্যে বর্জ্য থেকে সম্পদ তৈরি করছেন'
                : 'Join thousands of people who are already creating wealth from waste'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {language === 'bn' ? 'নিবন্ধন করুন' : 'Register Now'}
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center items-center space-x-8 mt-12">
              <div className="text-white/80 text-sm flex items-center space-x-2">
                <FaShieldAlt />
                <span>{language === 'bn' ? 'নিরাপদ লেনদেন' : 'Secure Payments'}</span>
              </div>
              <div className="text-white/80 text-sm flex items-center space-x-2">
                <FaClock />
                <span>{language === 'bn' ? '২৪/৭ সেবা' : '24/7 Service'}</span>
              </div>
              <div className="text-white/80 text-sm flex items-center space-x-2">
                <FaHandsHelping />
                <span>{language === 'bn' ? '১০,০০০+ সদস্য' : '10,000+ Members'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;