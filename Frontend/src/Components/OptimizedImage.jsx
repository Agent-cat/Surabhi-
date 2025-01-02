import React, { memo, useState, useRef, useEffect } from 'react';

const OptimizedImage = memo(({ src, alt, onClick, className, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef();

  // Improved blur hash placeholder with color
  const placeholderSrc = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23301934' /%3E%3C/svg%3E`;

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = src;
    
    if (priority) {
      img.onload = () => setIsLoaded(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          img.onload = () => setIsLoaded(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '100px',
        threshold: 0.01 
      }
    );

    if (imgRef.current && !priority) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
      img.onload = null;
    };
  }, [src, priority]);

  return (
    <div 
      ref={imgRef} 
      className={`${className} relative overflow-hidden`}
      style={{ backgroundColor: '#301934' }}
    >
      <img
        src={placeholderSrc}
        alt={alt}
        className={`${className} absolute inset-0 blur-lg scale-110`}
        style={{ 
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onClick={onClick}
        className={`${className}`}
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
        onLoad={() => {
          // Add a small delay to ensure smooth transition
          setTimeout(() => setIsLoaded(true), 50);
        }}
      />
    </div>
  );
});

export default OptimizedImage; 