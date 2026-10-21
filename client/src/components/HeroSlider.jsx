import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'ocean-freight',
    image: '/assets/images/hero-ocean-freight.jpg',
    headline: ['Transport Your Goods', 'Around the World'],
    alt: 'Large container ship carrying colorful cargo across the ocean'
  },
  {
    id: 'air-freight',
    image: '/assets/images/hero-air-freight.jpg',
    headline: ['Your Global Logistics', 'Partner'],
    alt: 'Commercial air freight cargo plane on airport runway'
  },
  {
    id: 'road-transport',
    image: '/assets/images/hero-road-transport.jpg',
    headline: ['We Deliver Your Goods', 'Fast & Safe'],
    alt: 'Commercial freight semi-truck transporting cargo on highway'
  }
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Autoplay timer with 5.5s interval, paused on hover/interaction
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative w-full h-[65vh] sm:h-[72vh] md:h-[78vh] lg:h-[84vh] min-h-[460px] max-h-[850px] overflow-hidden bg-slate-900 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Image Carousel"
    >
      {/* Background Image Carousel with Cross-fade Transition */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide.id}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <img
            src={currentSlide.image}
            alt={currentSlide.alt}
            className="w-full h-full object-cover object-center"
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
          />

          {/* Balanced dark overlay to guarantee contrast for bold white text */}
          <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Prominent Centered White Headline & Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 text-center pointer-events-none">
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          <AnimatePresence initial={false}>
            <motion.h1
              key={`title-${currentSlide.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]"
            >
              {Array.isArray(currentSlide.headline) ? (
                currentSlide.headline.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < currentSlide.headline.length - 1 && <br className="hidden sm:inline" />}
                    {i < currentSlide.headline.length - 1 && <span className="sm:hidden"> </span>}
                  </React.Fragment>
                ))
              ) : (
                currentSlide.headline
              )}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Controls: Previous Arrow (Left Edge) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#00539C] hover:bg-[#003d73] active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>

      {/* Slider Controls: Next Arrow (Right Edge) */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#00539C] hover:bg-[#003d73] active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>

      {/* Slide Indicators at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
              idx === currentIndex
                ? 'w-7 sm:w-8 h-2 bg-orange-500 shadow-md'
                : 'w-2 h-2 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
