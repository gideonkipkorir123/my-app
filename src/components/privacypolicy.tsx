'use client'
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-400 min-h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>
        <p className="mb-4">Your Trust Matters</p>
        <p className="mb-4">At [Your Loan App Name], we take your privacy seriously. This Privacy Policy explains how we collect, use, and disclose your information when you use our loan application and related services (Services).</p>
        <p className="mb-4"><strong>Information We Collect:</strong></p>
        <ul className="list-disc pl-8 mb-4">
          <li>Personal Information: We collect information that can identify you, such as your name, address, phone number, email address, Social Security number, and employment details.</li>
          <li>Device Information: We collect data about the device you use to access our Services, including device type, operating system, IP address, and browser information.</li>
          <li>Usage Information: We collect information about how you use our Services, such as the pages you visit, the features you use, and the searches you conduct.
            <p className="ml-4"><strong>How We Use Your Information:</strong></p>
            <ul className="list-disc pl-8 mb-4">
              <li>We use your information to process your loan application and manage your account.</li>
              <li>We may use your information to send you important communications about your loan, such as statements and notifications.</li>
              <li>We may use your information to improve our Services and develop new features.</li>
              <li>We may use your information for marketing purposes, but you will always have the option to opt-out of receiving marketing communications.</li>
              <li>We will never sell or share your personal information with third parties for marketing purposes without your consent.</li>
            </ul>
          </li>
        </ul>
        {/* Add more paragraphs and lists as needed */}
        <p>{/* Add more paragraphs here */}</p>
        <ul>{/* Add more lists here */}</ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
