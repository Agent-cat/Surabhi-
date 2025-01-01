import React, { memo, useState, useRef, useEffect } from 'react';

const OptimizedImage = memo(({ src, alt, onClick, className, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  // Generate blur hash placeholder
  const placeholderSrc = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.01 
      }
    );

    if (imgRef.current && !priority) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} className={`${className} relative overflow-hidden bg-purple-900/10`}>
      {(isInView || priority) && (
        <>
          <img
            src={placeholderSrc}
            alt={alt}
            className={`${className} absolute inset-0 blur-lg scale-110`}
            style={{ opacity: isLoaded ? 0 : 1 }}
          />
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onClick={onClick}
            className={`${className} transition-opacity duration-300`}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        </>
      )}
    </div>
  );
});

export default OptimizedImage; 