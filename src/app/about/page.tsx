import React from 'react';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2">
          <Image
            src="/about.jpg"
            alt="About Us"
            width={600}
            height={400}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">About Our Loan App</h1>
          <p className="text-lg text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
            urna consequat, tempus nunc vitae, bibendum risus. Mauris maximus,
            urna eu egestas varius, risus neque congue dolor, vel cursus
            lectus dui sit amet justo.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In hac habitasse platea dictumst. Sed nec ligula at arcu dignissim
            suscipit. Curabitur sodales magna non risus luctus, vitae
            ullamcorper turpis consectetur. Nam vel hendrerit lorem.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Vestibulum nec leo sit amet mauris semper varius. In porttitor
            ligula ut justo malesuada, sit amet efficitur felis interdum.
            Vivamus fermentum, eros ac gravida efficitur, velit elit
            consectetur lorem, nec malesuada nisi eros nec nisi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
