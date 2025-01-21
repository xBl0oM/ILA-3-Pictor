import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { initAnalytics } from './firebase';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

const App = () => {
  useEffect(() => {
    // Initialize Firebase Analytics
    initAnalytics().catch(console.error);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
