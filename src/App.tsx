import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import { useClientMediaQuery } from './helpers/useClientMediaQuery'
import Chat from './components/chat/Chat'
import Home from './components/home/Home'

function App() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  return (
    <Router>
      <div
        style={{
          background: '#18191A',
          height: '100svh',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <main
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexGrow: 1,
            minHeight: '0',
          }}
        >
          <Navigation isMobile={isMobile} />
          <Routes>
            <Route path="/home" element={<Home isMobile={isMobile} />} />
            <Route path="/" element={<Chat isMobile={isMobile} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
