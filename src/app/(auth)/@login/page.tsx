import Login from '@/components/Login'
import ReduxProvider from '@/store/reduxProvider'
import React from 'react'

export default function LoginForm() {
  return (
    <ReduxProvider>
      <Login/>
    </ReduxProvider>
  )
}
