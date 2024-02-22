
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Page/HomePage'
// import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import {Toaster} from 'react-hot-toast';
import VerifyEmail from './Page/VerifyEmail'
import ForgotPassword from './Page/ForgotPassword'
import RessetPassword from './Page/RessetPassword'
import PrivateRoute from './utils/PrivateRoute'
function App() {
  return (
    <>
      <BrowserRouter>
       {/* <Navbar/> */}
        <Routes>
            <Route path='/' element={<PrivateRoute><HomePage/></PrivateRoute>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
         
            <Route path='/verify-email' element={<VerifyEmail/>}/>
            <Route path='/reset-password/:id' element={<RessetPassword/>}/>
            <Route path='/reset-password' element={<ForgotPassword/>}/>
        </Routes>
      </BrowserRouter>
     <Toaster/>
    </>
  )
}

export default App
