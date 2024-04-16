import ForgotPassword from '@/components/ForgotPassword'
import ReduxProvider from '@/store/reduxProvider'
import React from 'react'

export default function ForgotPasswordPage() {
  return (
    <div>
      <ReduxProvider>

      <ForgotPassword/>
      </ReduxProvider>
    </div>
  )
}
