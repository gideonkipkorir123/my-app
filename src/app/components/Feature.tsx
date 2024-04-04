import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="feature p-6 rounded-lg shadow-md hover:shadow-lg-hover bg-white">
      <FaPlus className="w-8 h-8 text-primary mb-2" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800 pt-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface FeaturesSectionProps {}

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  return (
    <section className="features section py-12 bg-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Features</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <Feature
          title="Fast Approval"
          description="Get a decision on your loan application within minutes. No more waiting for days!"
        />
        <Feature
          title="Competitive Rates"
          description="Enjoy low interest rates and flexible repayment options. We provide the best rates in the market!"
        />
        <Feature
          title="Easy Online Application"
          description="Apply for a loan from the comfort of your home in just a few steps. No need to visit the bank!"
        />
        <Feature
          title="24/7 Customer Support"
          description="Our dedicated support team is available round the clock to assist you with any queries or concerns. We've got you covered!"
        />
        <Feature
          title="Secure and Reliable"
          description="Rest assured, your personal and financial information is safe with us. We use state-of-the-art security measures to protect your data!"
        />
        <Feature
          title="Quick Disbursement"
          description="Once approved, your loan amount will be disbursed to your account instantly. No more waiting for weeks to get access to your funds!"
        />a
      </div>
    </section>
  );
};

export default FeaturesSection;
