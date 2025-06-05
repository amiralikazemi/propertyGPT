import { useState } from 'react'

import './App.css'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'

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
          {/* Chat + Image Panel Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chat Area (Left) */}
            <div className="flex-1 flex flex-col border-r border-gray-200">
              <ChatArea />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App
