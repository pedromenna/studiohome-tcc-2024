'use client'; // Isso marca este componente como um Client Component

import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 6000); // 6000ms = 6 segundos
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, images.length]);

  return (
    <div className="carousel">
      <button className="carousel__button carousel__button--prev" onClick={() => {
        handlePrevious();
        resetInterval();
      }}>
        &lt;
      </button>
      <div className="carousel__image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`carousel__image ${currentIndex === index ? 'carousel__image--visible' : 'carousel__image--hidden'}`}
          />
        ))}
      </div>
      <button className="carousel__button carousel__button--next" onClick={() => {
        handleNext();
        resetInterval();
      }}>
        &gt;
      </button>
      <div className="carousel__dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`carousel__dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => {
              setCurrentIndex(index);
              resetInterval();
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
