"use client"
import ReduxProvider from '@/store/reduxProvider'
import React from 'react'
import DashBoardComponent from './dashboard/page'

function Home() {
  return (
    <ReduxProvider>
      <DashBoardComponent/>
    </ReduxProvider>
  )
}

export default Home
