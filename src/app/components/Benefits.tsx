import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const Benefits = () => {
  const [isOpen, setIsOpen] = useState([false, false, false, false]);

  const toggleAccordion = (index: number) => {
    const updatedIsOpen = isOpen.map((item, i) => (i === index ? !item : false));
    setIsOpen(updatedIsOpen);
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Benefits of Using Our Loan App</h2>
        <div className="accordion">
          {[0, 1, 2, 3].map((index) => (
            <div className="accordion-header" key={index}>
              <div
                className="accordion-trigger cursor-pointer flex justify-between items-center px-6 py-4 bg-white rounded-lg shadow-md"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {index === 0 && 'Quick Approval Process'}
                  {index === 1 && 'Low Interest Rates'}
                  {index === 2 && 'Flexible Repayment Options'}
                  {index === 3 && 'Excellent Customer Service'}
                </h3>
                <div className="flex items-center">
                  {isOpen[index] ? (
                    <BsChevronUp className="text-gray-600 text-xl hover:text-gray-800" />
                  ) : (
                    <BsChevronDown className="text-gray-600 text-xl hover:text-gray-800" />
                  )}
                </div>
              </div>
              <div className={`accordion-content ${isOpen[index] ? 'block' : 'hidden'} px-6 pb-4`}>
                <p className="text-gray-600">
                  {index === 0 && 'Our loan app offers a quick and hassle-free approval process, so you can get the funds you need when you need them.'}
                  {index === 1 && 'We offer competitive interest rates to ensure that you get the best deal possible on your loan.'}
                  {index === 2 && 'Our loan app provides flexible repayment options tailored to your financial situation.'}
                  {index === 3 && 'We pride ourselves on providing excellent customer service and support to our users.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
