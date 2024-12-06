/** @format */

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Welcome from "./components/Welcome";
import Nav from "./components/Nav";
import './App.css'
const App = () => {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};
export default App;
