'use client'
import React, { useState, useEffect } from 'react';

const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault();
  const text = e.clipboardData && e.clipboardData.getData('text') || '';
  if (text.match(/^\d{4}$/)) {
    const digits = text.split('');
    setOTPInputs(digits);
  }
};

const OTPPage: React.FC = () => {
  const [otpInputs, setOTPInputs] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !/^[0-9]{1}$/.test(e.key)
        && e.key !== 'Backspace'
        && e.key !== 'Delete'
        && e.key !== 'Tab'
        && !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        const index = otpInputs.findIndex((input, i) => input === '' && i > 0);
        if (index !== -1) {
          const newInputs = [...otpInputs];
          newInputs[index - 1] = '';
          setOTPInputs(newInputs);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [otpInputs]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.match(/^\d{1}$/)) {
      const newInputs = [...otpInputs];
      newInputs[index] = value;
      setOTPInputs(newInputs);
      const nextInput = e.target.nextElementSibling as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
        <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your phone number.</p>
      </header>
      <form>
        <div className="flex items-center justify-center gap-3">
          {otpInputs.map((input, index) => (
            <input
              key={index}
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength={1}
              value={input}
              onChange={(e) => handleInput(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">Did not receive code? <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Resend</a></div>
    </div>
  );
};

export default OTPPage;
function setOTPInputs(digits: string[]) {
    throw new Error('Function not implemented.');
}

