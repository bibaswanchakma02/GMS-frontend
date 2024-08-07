import { useState } from 'react'
import Loginpage from './screens/loginPage/loginpage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './screens/layout/layout'
import { AuthProvider } from './context/AuthContext'
import Home from './screens/homepage/home'
import ProtectedRoute from './config/ProtectedRoute'
import PasswordResetPage from './screens/passwordReset/passwordReset'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Loginpage />
        },
        {
          path: '/main',
          element: <ProtectedRoute element={<Home/>}/>
        },
        {
          path: '/password/reset',
          element: <ProtectedRoute element={<PasswordResetPage/>}/>
        }
      ]
    }
  ])

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
