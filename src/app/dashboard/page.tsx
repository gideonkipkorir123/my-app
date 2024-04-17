import DashBoardComponent from '@/components/DashBoard'
import ReduxProvider from '@/store/reduxProvider'
import React from 'react'

export default function DashboardPage() {
  return (
    <ReduxProvider>
      <DashBoardComponent/>
    </ReduxProvider>
  )
}
