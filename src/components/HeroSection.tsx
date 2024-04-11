'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['/logo.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero relative mt-16 bg-gray-200"> {/* Change background color to greyish */}
      <div className="container mx-auto px-4 py-8 md:py-16 md:flex md:items-center md:justify-between">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4"> {/* Change text color to black */}
            Get the Loan You Need, Quickly and Easily
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8"> {/* Change text color to black */}
            We offer fast and hassle-free loans to help you with your financial needs.
          </p>
          <button className="btn btn-primary blink-button mb-4 md:mb-0">Apply Now</button>
        </div>
        <div className="w-full md:w-1/2 h-full flex justify-center items-center">
          <Image
            src={images[currentImageIndex]}
            alt="Hero image"
            layout="intrinsic"
            width={500}
            height={400}
            loading="lazy"
            style={{ marginTop: '40px' }}
          />
        </div>
      </div>
      <style jsx>{`
        .hero {
          min-height: 70vh;
        }

        .blink-button {
          background-color: red;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          animation: blink 1s infinite alternate;
        }

        @keyframes blink {
          from {
            opacity: 1;
          }
          to {
            opacity: 0.5;
          }
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            text-align: center;
          }
          .btn {
            width: 100%;
          }
          .flex.items-center {
            flex-direction: column;
          }
          .text-3xl {
            font-size: 2rem; /* Adjust font size for smaller devices */
          }
          .text-lg {
            font-size: 1.125rem; /* Adjust font size for smaller devices */
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
