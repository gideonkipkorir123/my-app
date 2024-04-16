import RegisterForm from '@/components/Register'
import ReduxProvider from '@/store/reduxProvider'
import React from 'react'

export default function Register() {
  return (
    <div>
      <ReduxProvider>

        <RegisterForm />
      </ReduxProvider>
    </div>
  )
}
