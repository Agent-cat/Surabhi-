import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


import poster1 from "../assets/poster1.jpg"
import poster2 from "../assets/poster1.jpg"
import poster3 from "../assets/poster1.jpg"

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState("Vastrashala");
  const [selectedImage, setSelectedImage] = useState(null);

  // Define events first
  const events = useMemo(() => ({
    Natayaka: [
      { image: "https://i.imghippo.com/files/ntv8180co.jpg" },
      { image: "https://i.imghippo.com/files/JLnE5821vgI.jpg" },
      { image: "https://i.imghippo.com/files/iKNg1976KoI.jpg" },
      { image: "https://i.imghippo.com/files/wYBV3499MLk.jpg" },
      { image: "https://i.imghippo.com/files/HJaT8011tM.jpg" },
      { image: "https://i.imghippo.com/files/UtJ5585PFo.jpg" },
    ],
    Chitrakala: [
      { image: poster1 },
      { image: poster2 },
      { image: poster3 },
      { image: poster1 },
      { image: poster2 },
      { image: poster3 },
      { image: poster1 },
      { image: poster2 },
      { image: poster3 },
      { image: poster1 },
      { image: poster2 },
      { image: poster3 },
    ],
    Nritya: [
      { image: "https://i.imghippo.com/files/ex3195bc.jpg" },
      { image: "https://i.imghippo.com/files/dXm8770qPM.jpg" },
      { image: "https://i.imghippo.com/files/XEZv4283NU.jpg" },
      { image: "https://i.imghippo.com/files/kJpN7106VK.jpg" },
      { image: "https://i.imghippo.com/files/UPln2931Nxw.jpg" },
      { image: "https://i.imghippo.com/files/yg8899L.jpg" },
    ],
    Raaga: [
      { image: "https://i.imghippo.com/files/BVuY2188Lj.jpg" },
      { image: "https://i.imghippo.com/files/nigY5621pR.jpg" },
      { image: "https://i.imghippo.com/files/oPj6522Es.jpg" },
      { image: "https://i.imghippo.com/files/XUjc5970O.jpg" },
      { image: "https://i.imghippo.com/files/mPRD4110TYU.jpg" },
      { image: "https://i.imghippo.com/files/aBGu5336Bu.jpg" },
      { image: "https://i.imghippo.com/files/oPj6522Es.jpg" },
      { image: "https://i.imghippo.com/files/mPRD4110TYU.jpg" },
      { image: "https://i.imghippo.com/files/mPRD4110TYU.jpg" },
      { image: "https://i.imghippo.com/files/fQ4379Wsg.jpg" },
      { image: "https://i.imghippo.com/files/aBGu5336Bu.jpg" },
    ],
    CineCarnival: [
      { image: "https://i.imghippo.com/files/vtIK7188pAI.jpg" },
      { image: "https://i.imghippo.com/files/fP5006VmE.jpg" },
      { image: "https://i.imghippo.com/files/im2573eg.jpg" },
      { image: "https://i.imghippo.com/files/agB4246MHA.jpg" },
      { image: "https://i.imghippo.com/files/WHXl6230xw.jpg" },
      { image: "https://i.imghippo.com/files/fLa2578Yis.jpg" },
      { image: "https://i.imghippo.com/files/sLmQ8981xMs.jpg" },
      { image: "https://i.imghippo.com/files/sLmQ8981xMs.jpg" },
      { image: "https://i.imghippo.com/files/EUa6624jVk.jpg" },
     
    ],
    Sahithya: [
      { image: poster1 },
      { image: poster2 },
      { image: poster3 },
      { image: poster1 },
      { image: poster2 },
      { image: poster3 },
      { image: poster1 },
      { image: poster2 },
      { image: poster3 },
      { image: poster1 },
      { image: poster2 },
      { image: poster3 },
    ],
    Vastrashala: [
      { image: "https://i.imghippo.com/files/IQfu6477O.jpg" },
      { image: "https://i.imghippo.com/files/CfF6396wOo.jpg" },
      { image: "https://i.imghippo.com/files/Qtt7527iyg.jpg" },
      { image: "https://i.imghippo.com/files/VMXL5031AmE.jpg" },
      { image: "https://i.imghippo.com/files/OgH5926ac.jpg" },
      { image: "https://i.imghippo.com/files/fgjO4196iU.jpg" },
      { image: "https://i.imghippo.com/files/FWT8820dzg.jpg" },
      { image: "https://i.imghippo.com/files/fgjO4196iU.jpg" },
      { image: "https://i.imghippo.com/files/FBO7271rO.jpg" },
      { image: "https://i.imghippo.com/files/FBO7271rO.jpg" },
      { image: "https://i.imghippo.com/files/wOdD4411wQU.jpg" },
    ],
  }), []);

  // Calculate current event items
  const currentEventItems = useMemo(() => {
    return events[selectedEvent] || [];
  }, [events, selectedEvent]);

  // Preload images
  const preloadImages = useCallback((images) => {
    images.forEach(item => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  // Preload images when event changes
  useEffect(() => {
    if (events[selectedEvent]) {
      preloadImages(events[selectedEvent]);
    }
  }, [selectedEvent, events, preloadImages]);

  // Optimize image loading
  useEffect(() => {
    const images = currentEventItems;
    images.forEach(item => {
      if (item?.image) {
        const img = new Image();
        img.loading = "lazy";
        img.src = item.image;
      }
    });
  }, [currentEventItems]);

  const handleEventSelect = useCallback((eventName) => {
    setSelectedEvent(eventName);
  }, []);

  const handleImageSelect = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleImageClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-20">
        <motion.h1
          className="text-6xl md:text-7xl text-center font-playfair bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Gallery
        </motion.h1>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(events).map((eventName, index) => (
            <motion.button
              key={eventName}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all relative
                ${
                  selectedEvent === eventName
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-purple-900/30 text-purple-300 hover:bg-purple-800/40"
                }
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                before:border-2 before:border-purple-500 before:rounded-full before:opacity-0 
                hover:before:opacity-100 before:transition-all before:duration-300 before:scale-110
                hover:before:scale-100`}
              onClick={() => handleEventSelect(eventName)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {eventName.replace(/([A-Z])/g, " $1").trim()}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            {[0, 1, 2, 3].map((rowIndex) => {
              const items = currentEventItems.slice(
                rowIndex * 3,
                (rowIndex + 1) * 3
              );

              if (!items.length) return null;

              return (
                <motion.div
                  key={rowIndex}
                  className="grid grid-cols-12 gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                >
                  {rowIndex % 2 === 0 ? (
                    <>
                      <motion.div
                        className="col-span-8 aspect-video bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleImageSelect(items[0]?.image)}
                      >
                        {items[0]?.image && (
                          <img
                            loading="lazy"
                            decoding="async"
                            src={items[0].image}
                            alt="Event"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                      <motion.div
                        className="col-span-4 aspect-square bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleImageSelect(items[1]?.image)}
                      >
                        {items[1]?.image && (
                          <img
                            loading="lazy"
                            decoding="async"
                            src={items[1].image}
                            alt="Event"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="col-span-4 aspect-square bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleImageSelect(items[0]?.image)}
                      >
                        {items[0]?.image && (
                          <img
                            loading="lazy"
                            decoding="async"
                            src={items[0].image}
                            alt="Event"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                      <motion.div
                        className="col-span-8 aspect-video bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleImageSelect(items[1]?.image)}
                      >
                        {items[1]?.image && (
                          <img
                            loading="lazy"
                            decoding="async"
                            src={items[1].image}
                            alt="Event"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
              onClick={handleImageClose}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={selectedImage}
                  alt="Full size"
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
                />
                <button
                  onClick={handleImageClose}
                  className="absolute top-4 right-4 text-white rounded-full p-2 hover:scale-150 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default React.memo(Gallery);