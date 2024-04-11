'use client'
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      testimonial: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
   
  ];

  return (
    <div className="testimonials-container">
      <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">{testimonial.testimonial}</p>
            <p className="text-gray-800 font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
