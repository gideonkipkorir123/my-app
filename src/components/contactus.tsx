'use client'
import React, { useState, FormEvent } from 'react';
import { AiFillPhone, AiFillMail, AiFillTwitterCircle, AiFillFacebook, AiFillMessage } from 'react-icons/ai';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto flex justify-center items-center mt-8 mb-8">
      <div className="w-2/3 pr-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="input-field h-40"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-1/3">
        <div className="text-sm text-gray-700">
          <p className="mb-4">
            Here at Content Company, we strive to make your loan application process as smooth as possible. However, we understand that questions may arise along the way. Our dedicated customer support team is here to provide personalized assistance and address any concerns you might have.
          </p>
          <p>
            <strong>Contact Methods:</strong>
          </p>
          <div className="flex justify-start items-center space-x-4 mt-4">
            <AiFillPhone className="text-3xl" />
            <span>+254710246806</span>
          </div>
          <div className="flex justify-start items-center space-x-4 mt-2">
            <AiFillMail className="text-3xl" />
            <span>gideonkipkorir00@gmail.com</span>
          </div>
          <div className="flex justify-start items-center space-x-4 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <AiFillTwitterCircle className="text-3xl" />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <AiFillFacebook className="text-3xl" />
            </a>
            <a href="#" className="text-green-500 hover:text-green-700">
              <AiFillMessage className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
