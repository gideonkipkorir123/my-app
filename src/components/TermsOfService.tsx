'use client'
import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-400 min-h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-semibold mb-4">Terms of Service</h2>
        <p>Welcome to [Your Loan App Name]!</p>
        <p>These Terms of Service (Terms) govern your use of our loan application and related services (Services). By using our Services, you agree to be bound by these Terms.</p>
        <p><strong>Eligibility:</strong></p>
        <ul className="list-disc pl-8 mb-4">
          <li>You must be at least 18 years old and a legal resident of the United States to use our Services.</li>
        </ul>
        <p><strong>Using Our Services:</strong></p>
        <ul className="list-disc pl-8 mb-4">
          <li>You will provide accurate and complete information when using our Services.</li>
          <li>You will not use our Services for any illegal or unauthorized purpose.</li>
          <li>You will comply with all applicable laws and regulations.</li>
        </ul>
        <p><strong>Loan Terms:</strong></p>
        <ul className="list-disc pl-8 mb-4">
          <li>The loan terms, including interest rates, fees, and repayment schedules, will be disclosed to you before you accept a loan offer.</li>
        </ul>
        <p><strong>Payment:</strong></p>
        <ul className="list-disc pl-8 mb-4">
          <li>You are responsible for making timely payments on your loan as agreed upon in the loan agreement.</li>
        </ul>
        <p><strong>Termination:</strong></p>
        <ul className="list-disc pl-8 mb-4">
          <li>We may terminate your use of our Services for any reason, at any time, without notice.</li>
        </ul>
        <p><strong>Disclaimer:</strong></p>
        <ul className="list-disc pl-8 mb-4">
          <li>We make no warranties or guarantees about the accuracy, completeness, or reliability of the content or services provided through our platform. You acknowledge that you are using our Services at your own risk.</li>
        </ul>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default TermsOfService;
