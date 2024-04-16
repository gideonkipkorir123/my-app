"use client"
import React from 'react';
import Layout from './(auth)/layout';
import ForgotPasswordPage from './(auth)/@forgotPassword/page';
import LoginForm from './(auth)/@login/page';
import Register from './(auth)/@register/page';

const MyPage: React.FC = () => {
  return (
    <Layout
      forgotPassword={<ForgotPasswordPage/>}
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

export default MyPage;
