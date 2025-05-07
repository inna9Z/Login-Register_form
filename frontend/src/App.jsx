
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthContext } from './context/authContext'

function App() {
  const { authUser } = useAuthContext()


  return (
    <>

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <LoginPage />} />
      </Routes>
      <Toaster />

    </>
  )
}

export default App
