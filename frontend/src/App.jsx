import './App.css'
import GetStarted from './pages/GetStarted';
import Landing from './pages/Landing'
import Login from './pages/Login';
import MainPage from './pages/MainPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
   

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/getStarted" element={<GetStarted/>}/>
          <Route path='/tasks' element={<MainPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
