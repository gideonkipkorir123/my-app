"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ResetPassword from '@/components/ResetPassword';

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(null);
  const searchParams = useSearchParams()
  const pathname = usePathname();

  useEffect(() => {
    const resetPasswordToken = searchParams.get('slug') || null;
    if (typeof resetPasswordToken === 'string') {
      setResetPasswordToken(resetPasswordToken);
    }
  }, [searchParams]);

  if (!resetPasswordToken) {
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
