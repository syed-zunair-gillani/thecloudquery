'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const ConditionalLazyImage = ({ src, alt, width, height }) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the image is visible
    );

    const currentImageRef = imageRef.current;

    if (currentImageRef) {
      observer.observe(currentImageRef);
    }

    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
    };
  }, []);

  return (
    <div ref={imageRef}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={isInViewport ? 'eager' : 'lazy'}
      />
    </div>
  );
};

export default ConditionalLazyImage;