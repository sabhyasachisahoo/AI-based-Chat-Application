import React from 'react'
import 'highlight.js/styles/nord.css'; // ✅ Theme CSS
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context'

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
