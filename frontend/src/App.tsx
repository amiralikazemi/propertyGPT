import { useState } from 'react'

import './App.css'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div>
      <div className="flex min-h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Top Navigation Bar */}
          <TopNav />
        </div>
      </div>
    </div>

  )
}

export default App
