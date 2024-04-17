"use client"
import ResetPassword from '@/components/ResetPassword';
import ReduxProvider from '@/store/reduxProvider';
import React from 'react';
interface DocProps {
  params: {
    resetPasswordToken: string;
  };
}

const ResetPasswordPage: React.FC<DocProps> = ({ params }) => {
  const { resetPasswordToken } = params;

  return (
    <ReduxProvider>
      {resetPasswordToken.length > 0 ? (
        <ResetPassword resetPasswordToken={resetPasswordToken} />
      ) : (
        <p>No reset password token provided or tokens expired</p>
      )}
    </ReduxProvider>
  );
};

export default ResetPasswordPage;
