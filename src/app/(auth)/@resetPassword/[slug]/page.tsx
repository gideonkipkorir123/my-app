import React from 'react';
import { useRouter } from 'next/router';
import ResetPassword from '@/components/ResetPassword';

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query as { slug?: string | string[] };
  const resetPasswordToken = Array.isArray(slug) ? slug[0] : slug;

  if (typeof resetPasswordToken !== 'string') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Password Reset</h1>
      <ResetPassword resetPasswordToken={resetPasswordToken} />
    </div>
  );
};

export default ResetPasswordPage;
