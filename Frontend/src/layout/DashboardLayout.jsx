import React from 'react'
import Sidebaar from '../components/Sidebaar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">

      <aside className="w-[15%] h-full bg-white border-r border-gray-200">
        <Sidebaar />
      </aside>

      <div className="w-[85%] h-full flex flex-col bg-gray-100">
        
        <header className="h-[60px] bg-white border-b border-gray-200 flex items-center px-4">
          <Header />
        </header>

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default DashboardLayout
