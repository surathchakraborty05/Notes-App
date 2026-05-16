import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';


function App() {
  const [alert,setalert] = useState(null);
  const setAlert = (message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  return (
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home setAlert={setAlert}/>} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login setAlert={setAlert}/>} />
        <Route exact path="/signup" element={<Signup setAlert={setAlert} />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;