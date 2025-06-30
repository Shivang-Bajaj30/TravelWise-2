import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';

const Home = () => {
  const images = [
    '/images/bg1.jpg',
    '/images/bg2.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg',
    '/images/mountains.jpg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(true);
    }, 4000); // Change image every 2.5 seconds
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  // Preload images to avoid white flash
  useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new window.Image();
      preloadImg.src = img;
    });
  }, [images]);

  // Reset animation state after transition
  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3f4f6' }}>
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden flex items-center justify-center">
        {/* Previous image fades out */}
        {isAnimating && prevImageIndex !== null && (
          <motion.div
            key={images[prevImageIndex] + '-prev'}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[prevImageIndex]})` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        )}
        {/* Current image fades in (no fade for first image) */}
        <motion.div
          key={images[currentImageIndex] + '-current'}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          initial={{ opacity: prevImageIndex === null ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{}}
          transition={{ duration: prevImageIndex === null ? 0 : 0.7, ease: 'easeInOut' }}
        />
        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
            Discover Your Next Adventure
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
            Plan your perfect trip with TravelWise – explore breathtaking destinations and curated packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Where would you like to go?"
              className="px-6 py-3 rounded-lg text-lg w-full sm:w-auto flex-1 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Section (Placeholder) */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200" /> {/* Placeholder for image */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">Destination {i}</h3>
                <p className="text-gray-600 mt-2">Explore stunning landscapes and vibrant cultures.</p>
                <button className="mt-4 text-blue-600 font-semibold hover:underline">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Destinations = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Our Destinations</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Our destinations page is coming soon! Discover a world of travel opportunities with
        TravelWise.
      </p>
    </div>
  </div>
);

const Packages = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Curated Travel Packages</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Our packages page is coming soon! Find the perfect travel package tailored to your needs.
      </p>
    </div>
  </div>
);

const App = () => (
  <div className="relative">
    <Navbar />
    <div className="pt-16">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </div>
  </div>
);

export default App;