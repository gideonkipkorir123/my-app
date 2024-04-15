"use client"
import ReduxProvider from '@/store/reduxProvider'
import React from 'react'
import LoginForm from './(auth)/@login/page'


function Home() {
  return (
    <ReduxProvider>
      <LoginForm/>
    </ReduxProvider>
  )
}

export default Home
