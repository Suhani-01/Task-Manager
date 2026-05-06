import './App.css'
import GetStarted from './pages/GetStarted';
import Landing from './pages/Landing'
import Login from './pages/Login';
import MainPage from './pages/MainPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 * Root Application Component
 * Handles global routing and page navigation using React Router
 */
function App() {
   

  return (
    <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing/>}/>
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/getStarted" element={<GetStarted/>}/>
          
          {/* Main Application Dashboard/Task View */}
          <Route path='/tasks' element={<MainPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App