import React,{ Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App=() => {
  return (
    <AuthState>
    <ContactState>
    <AlertState>
      <Router>
        <Fragment> 
          <Navbar/>
          <div className="container">
            <Alerts />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div> 
       </Fragment> 
      </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App
