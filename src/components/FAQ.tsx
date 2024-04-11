'use client'
import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I apply for a loan?',
      answer: 'To apply for a loan, you can visit our website and fill out the online application form. Make sure to provide accurate information to expedite the process.',
    },
    {
      question: 'What are the eligibility criteria for a loan?',
      answer: 'Our eligibility criteria vary depending on the type of loan you are applying for. Generally, we consider factors such as your credit score, income, employment status, and existing debts. Please refer to our website for specific eligibility requirements.',
    },
    {
      question: 'How long does it take to get approved for a loan?',
      answer: 'The approval process for a loan typically takes a few business days. However, the exact time may vary depending on various factors such as the type of loan, the completeness of your application, and our internal review process.',
    },
    {
      question: 'Can I apply for a loan with bad credit?',
      answer: 'Yes, we consider loan applications from individuals with varying credit scores. While a higher credit score may increase your chances of approval and favorable terms, we understand that not everyone has perfect credit. We assess each application on a case-by-case basis.',
    },
    {
      question: 'What documents do I need to provide for a loan application?',
      answer: 'The required documents may vary depending on the type of loan you are applying for. Common documents include proof of identity (e.g., passport or driver\'s license), proof of income (e.g., pay stubs or tax returns), and bank statements. Please refer to our website or contact our customer support team for a detailed list of required documents.',
    },
    {
      question: 'Can I apply for a loan if I am self-employed?',
      answer: 'Yes, we consider loan applications from self-employed individuals. However, you may need to provide additional documentation to verify your income and financial stability. Please contact our customer support team for more information on applying for a loan as a self-employed individual.',
    },
    {
      question: 'What are the interest rates and fees associated with your loans?',
      answer: 'Our interest rates and fees vary depending on the type of loan, loan amount, and your credit profile. We strive to offer competitive rates and transparent fee structures. Please refer to our website or contact our customer support team for information on current interest rates and fees.',
    },
    {
      question: 'How do I make loan repayments?',
      answer: 'We offer various repayment methods, including online payments, bank transfers, and automatic deductions from your bank account. You can choose the repayment method that is most convenient for you. Please refer to your loan agreement or contact our customer support team for detailed instructions on making loan repayments.',
    },
    {
      question: 'Can I refinance my existing loan?',
      answer: 'Yes, we offer loan refinancing options for eligible borrowers. Refinancing allows you to replace your existing loan with a new loan that may have better terms, such as a lower interest rate or longer repayment term. Please contact our customer support team for more information on refinancing your loan.',
    },
    {
      question: 'What should I do if I am unable to make my loan repayments?',
      answer: 'If you are experiencing financial difficulties and are unable to make your loan repayments, we encourage you to contact our customer support team as soon as possible. We offer assistance options such as loan restructuring, payment extensions, or hardship plans to help you manage your repayments during difficult times.',
    },
 
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 rounded p-6 bg-gradient-to-b from-gray-100 to-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded">
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {activeIndex === index ? <AiOutlineMinus className="text-gray-500" /> : <AiOutlinePlus className="text-gray-500" />}
            </div>
            {activeIndex === index && (
              <div className="p-4">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
