import React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';

interface ApplySectionProps {}

const ApplySection: React.FC<ApplySectionProps> = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // { name, email, amountNeeded, loanType }
    // Add logic here to handle form submission (e.g., send to server)
  };

  return (
    <section className="apply section py-12 bg-primary text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Get Started Today!</h2>
      <form className="flex flex-col mx-auto max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('name')}
          className="input mb-4 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
          placeholder="Name"
        />
        <input
          type="email"
          {...register('email')}
          className="input mb-4 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
          placeholder="Email"
        />
        <input
          type="number"
          {...register('amountNeeded')}
          className="input mb-4 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
          placeholder="Amount Needed"
        />
        <select
          {...register('loanType')}
          className="input mb-4 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
        >
          <option value="">Loan Type</option>
          <option value="personal">Personal Loan</option>
          <option value="auto">Auto Loan</option>
        </select>
        <button
          type="submit"
          className="btn btn-light flex items-center justify-center px-6 py-3 rounded-md bg-white text-primary hover:bg-gray-100 hover:text-primary transition duration-300 ease-in-out"
        >
          Apply Now <FaArrowRight className="ml-2" />
        </button>
      </form>
      <style jsx>{`
        .input {
          width: 100%;
          color: #000; /* Set text color */
        }
        .btn {
          width: 100%;
        }
        @media (min-width: 768px) {
          .input {
            max-width: 400px;
          }
          .btn {
            max-width: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default ApplySection;
