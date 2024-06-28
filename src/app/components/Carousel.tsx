'use client'; // Isso marca este componente como um Client Component

import React, { useState, useEffect } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500); // Tempo da transição para que a animação ocorra
  };

  const handlePrevious = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, 500); // Tempo da transição para que a animação ocorra
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // 6000ms = 6 segundos

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, images.length]);

  return (
    <div className="carousel">
      <button className="carousel__button carousel__button--prev" onClick={handlePrevious}>
        &lt;
      </button>
      <div className="carousel__image-container">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={`carousel__image ${animate ? 'carousel__image--animate' : ''}`}
        />
      </div>
      <button className="carousel__button carousel__button--next" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
