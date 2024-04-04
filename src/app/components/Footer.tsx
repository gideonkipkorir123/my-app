import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 text-center text-gray-600 bg-gray-200">
      <p>&copy; {new Date().getFullYear()} Gideon Kipkorir. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
