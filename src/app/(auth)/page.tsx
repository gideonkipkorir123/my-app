"use client"
import React from 'react';
import Layout from './layout';
import LoginForm from './login/page';
import Register from './register/page';

const DashBoard: React.FC = () => {
  return (
    <Layout
      login={<LoginForm />}
      register={<Register />}
    >
      <div>
        <h1>Welcome to MyPage</h1>
        <p>This is the main content of the page.</p>
      </div>
    </Layout>
  );
};

export default DashBoard;
