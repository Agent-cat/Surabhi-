import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import { loadSlim } from "tsparticles-slim"; 
import Particles from "react-tsparticles";

// Import assets
import video from "../assets/intro3.mp4";
import logo from "../assets/logo.png";
import poster2025 from "../assets/2025.jpg";
import poster2024 from "../assets/2024.jpg";
import poster2023 from "../assets/2023.jpg";
import poster2022 from "../assets/2022.jpg";

const timelineData = [
  {
    year: 2025,
    title: "The Future",
    description:
      "Celebrating cultural diversity with groundbreaking performances",
    image: poster2025,
  },
  {
    year: 2024,
    title: "New Heights",
    description: "Introduced new art forms and collaborative performances",
    image: poster2024,
  },
  {
    year: 2023,
    title: "Growing Strong",
    description:
      "Expanded to include international participants and professional artists",
    image: poster2023,
  },
  {
    year: 2022,
    title: "The Beginning",
    description:
      "First edition of Surabhi with over 1000 participants from across India",
    image: poster2022,
  },
];

const videoTeasers = [
  {
    title: "Dance Performances",
    thumbnail: poster2024,
    description: "Spectacular dance performances from previous years",
  },
  {
    title: "Music Shows",
    thumbnail: poster2023,
    description: "Mesmerizing musical performances",
  },
  {
    title: "Cultural Events",
    thumbnail: poster2025,
    description: "Highlights of our cultural celebrations",
  },
];

const carouselImages = [
  poster2022,
  poster2023, 
  poster2024,
  poster2025,
  poster2022,
  poster2022,
  poster2023, 
  poster2024,
  poster2025,
  poster2022,
  poster2023
];

const chiefGuests = [
  {
    name: "Harsha Chemudu",
    role: "Actor",
    image: "https://i.imghippo.com/files/jr9046JM.jpg"
  },
  {
    name: "Ram Miriyala", 
    role: "Singer",
    image: "https://i.imghippo.com/files/zP1283Cn.jpg"
  },
  {
    name: "Yashwanth ",
    role: "Dance Choreographer",
    image: "https://i.imghippo.com/files/Vmo5988bqM.jpg"
  },
  {
    name: "Naveen IAS",
    role: "IAS",
    image: "https://i.imghippo.com/files/HB6883o.jpg"
  },
  {
    name: "Pranav Kaushik",
    role: "Actor",
    image: "https://i.imghippo.com/files/uTea5112JY.jpg"
  },
  {
    name: "Vamsi Pujith",
    role: "Actor",
    image: "https://i.imghippo.com/files/kzQ3707HM.jpg"
  },
  {
    name: "Roshini Sahota",
    role: "Actress",
    image: "https://i.imghippo.com/files/uKRI5964lsY.jpg"
  },
  {
    name: "Garima Bhardwaj",
    role: "Designer",
    image: "https://i.imghippo.com/files/ZsZ8557JBE.jpg"
  },
  {
    name: "Navin Tammala",
    role: "Singer",
    image: "https://i.imghippo.com/files/cPXP5273wcw.jpg"
  },
  {
    name: "Deepak",
    role: "Music Composer",
    image: "https://i.imghippo.com/files/xgP2166aM.jpg"
  },
  {
    name: "Ananda Vardhan",
    role: "Actor",
    image: "https://i.imghippo.com/files/oPj6522Es.jpg"
  }
];

const participationSteps = [
  {
    id: 1,
    title: "Explore Events List",
    description: "Browse through our diverse range of cultural events and competitions"
  },
  {
    id: 2,
    title: "Event Registration",
    description: "Complete the registration process for your chosen events"
  },
  {
    id: 3,
    title: "Event Schedule",
    description: "Check the detailed schedule to plan your participation"
  },
  {
    id: 4,
    title: "Select Event",
    description: "Choose your preferred events from the available options"
  },
  {
    id: 5,
    title: "Event Requirements",
    description: "Review all requirements and guidelines for your selected events"
  },
  {
    id: 6,
    title: "Attend Event",
    description: "Join us at the venue and showcase your talent"
  }
];

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 102,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentGuest, setCurrentGuest] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const nextGuests = () => {
    setCurrentGuest((prev) => (prev + 3 >= chiefGuests.length ? 0 : prev + 3));
  };

  const prevGuests = () => {
    setCurrentGuest((prev) => (prev - 3 < 0 ? chiefGuests.length - 3 : prev - 3));
  };

  const visibleGuests = chiefGuests.slice(currentGuest, currentGuest + 3);

  const particleOptions = {
    fullScreen: {
      enable: true,
      zIndex: -100,
    },
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 900,
        },
      },
      opacity: {
        value: 0.3,
      },
      size: {
        value: 2,
      },
      move: {
        speed: 1,
      },
    },
    fpsLimit: 30,
  };

  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCarouselVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
      observer.observe(carouselElement);
    }

    return () => observer.disconnect();
  }, []);

  // Timeline images
  const TimelineImage = memo(({ item }) => (
    <img
      src={item.image}
      alt={item.title}
      className="rounded-lg shadow-xl w-full"
    />
  ));

  // Carousel images
  const CarouselImage = memo(({ src, index }) => (
    <img
      src={src}
      alt={`Carousel image ${index + 1}`}
      className="w-72 h-80 object-cover rounded-lg"
    />
  ));

  // Chief guest images
  const ChiefGuestImage = memo(({ guest }) => (
    <img
      src={guest.image}
      alt={guest.name}
      className="w-full h-60 object-cover"
    />
  ));

  return (
    <div className="relative w-full">
      <div className="bg-black text-white overflow-x-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
          className="absolute inset-0 z-0 hidden md:block pointer-events-none"
        />
        <div
          className="relative min-h-screen flex items-center justify-center bg-black p-4"
          ref={containerRef}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full rounded-3xl h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/70" />
          <motion.img
            src={logo}
            alt="SURABHI"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-48 object-contain sm:w-64 md:w-96 z-10"
          />
        </div>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-4 z-50 gap-4 text-center"
            >
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Days</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Hours</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Minutes</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Seconds</div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-6 md:mb-8 text-center text-white"
          >
            What about Surabhi
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 z-50"
            >
              <p>
              Surabhi 2025 is a two-day National Cultural fest hosted by KL University, celebrating student creativity through music, dance, drama, and artistic expression. Featuring renowned artists alongside exceptional student talent, the event showcases diversity in a vibrant and supportive environment. This year, the fest is focused on overcoming past challenges to deliver an enriched and memorable experience for both participants and attendees.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <video
                  width="100%"
                  height="100%"
                  controls
                  className="rounded-lg"
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <a
                href="https://youtu.be/3LgfXuZPWQE?feature=shared"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
              >
                <FaYoutube className="text-xl" />
                View on YouTube
              </a>
            </motion.div>
          </div>
        </div>

        {/* How to Participate section */}
        <div className="py-16 ">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-saint-carello md:text-6xl font-bold text-white mb-4">
                How to Participate?
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {participationSteps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-purple-900/20 rounded-lg p-8 group"
                >
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center text-3xl font-bold text-black shadow-lg shadow-[#C59D65]/30">
                    {step.id}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-purple-400 mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-lg">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Chief Guest Section */}
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-6 md:mb-8 text-center text-white"
          >
            Chief Guests
          </motion.h2>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleGuests.map((guest, index) => (
                <ChiefGuestImage key={index} guest={guest} />
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <button 
                onClick={prevGuests}
                className="bg-purple-900/50 p-2 rounded-full hover:bg-purple-900 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextGuests}
                className="bg-purple-900/50 p-2 rounded-full hover:bg-purple-900 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative max-w-6xl mx-auto px-4 py-16"
          style={{ overflow: "hidden" }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-12 text-center z-50"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-purple-900"
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            />

            {/* Timeline items */}
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col  sm:flex-row items-start sm:items-center mb-16 sm:mb-24 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="w-full sm:w-1/2 pl-12 sm:px-8 mb-4 sm:mb-0">
                  <TimelineImage item={item} />
                </div>
                <div className="w-full sm:w-1/2 pl-12 sm:px-8">
                  <div className="bg-purple-900/20 p-4 sm:p-6 rounded-lg">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {item.year}
                    </h3>
                    <h4 className="text-lg sm:text-xl text-purple-400 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Carousel Section */}
        <div className="carousel w-full overflow-hidden py-12">
          <motion.div 
            className="flex"
            animate={isCarouselVisible ? {
              x: ["0%", "-80%"]
            } : {}}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <div className="flex gap-4 min-w-full">
              {carouselImages.map((image, index) => (
                <CarouselImage key={index} src={image} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="w-full py-12 sm:py-16 px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-8 sm:mb-12 text-center z-50  "
          >
            Find Us Here
          </motion.h2>
          <div className="max-w-6xl flex justify-center rounded-2xl mx-auto h-[300px] sm:h-[400px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.6199592497847!2d80.62045731486546!3d16.441945088657577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d81943%3A0x8ba5d78f65df94b8!2sK%20L%20University!5e0!3m2!1sen!2sin!4v1677834271952!5m2!1sen!2sin&key=YOUR_GOOGLE_MAPS_API_KEY"
              width="80%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-2xl z-50"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
