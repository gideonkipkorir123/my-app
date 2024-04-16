"use client"
import ReduxProvider from '@/store/reduxProvider'
import React from 'react'
import ForgotPasswordPage from './(auth)/@forgotPassword/page'


function Home() {
  return (
    <ReduxProvider>
      <ForgotPasswordPage/>
    </ReduxProvider>
  )
}

export default Home
