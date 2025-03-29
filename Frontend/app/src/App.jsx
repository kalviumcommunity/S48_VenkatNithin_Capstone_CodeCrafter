import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ProfilePage from './Components/ProfilePage';
import CoursePage1 from './Components/CoursePage1'; // Import CoursePage1

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Route for Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Route for Signup Page */}
        <Route path="/register" element={<Signup />} />

        {/* Route for Profile Page */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Route for CoursePage1 */}
        <Route path="/course1" element={<CoursePage1 />} />
      </Routes>
    </Router>
  );
}

export default App;
