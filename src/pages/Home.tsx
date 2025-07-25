import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new window.Image();
      preloadImg.src = img;
    });
  }, [images]);

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center overflow-hidden h-[45vh] sm:h-[60vh] lg:h-[80vh] mt-[-3px]">
        {isAnimating && prevImageIndex !== null && (
          <motion.div
            key={images[prevImageIndex] + '-prev'}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${images[prevImageIndex]})`,
              filter: 'brightness(0.75)' 
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        )}
        <motion.div
          key={images[currentImageIndex] + '-current'}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${images[currentImageIndex]})`,
            filter: 'brightness(0.65)' 
          }}
          initial={{ opacity: prevImageIndex === null ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prevImageIndex === null ? 0 : 0.7, ease: 'easeInOut' }}
        />
        <div className="relative z-10 flex flex-col items-center px-4 text-center w-full max-w-3xl mx-auto">
          <h1 className="text-white font-bold mb-4 leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
            Discover Your Next Adventure
          </h1>
          <p className="text-white mb-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-sm sm:text-lg md:text-xl lg:text-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
            Plan your perfect trip with TravelWise – explore breathtaking destinations and curated packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs sm:max-w-md">
            <input
              type="text"
              placeholder="Where would you like to go?"
              className="px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto flex-1 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
            />
            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:from-orange-600 hover:to-red-700 transition-colors duration-200">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="h-40 sm:h-48 md:h-56 bg-gray-200 w-full" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Destination {i}</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base flex-1">Explore stunning landscapes and vibrant cultures.</p>
                <button className="mt-3 text-blue-600 font-semibold hover:underline text-sm sm:text-base w-max self-start">
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

export default Home;