import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

// Componentes de Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MaterialGenerator from './pages/MaterialGenerator';
import ExerciseBuilder from './pages/ExerciseBuilder';
import AssessmentCreator from './pages/AssessmentCreator';
import UserProfile from './pages/UserProfile';
import MaterialsLibrary from './pages/MaterialsLibrary';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('authToken') !== null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem('authToken', 'sample-token');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        
        <Box flex="1">
          {true ? ( // Substitua isLoggedIn por true temporariamente
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
              } />
              <Route path="/register" element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register onLogin={handleLogin} />
              } />
              
              {/* Rotas protegidas */}
              <Route path="/dashboard" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/generate-material" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <MaterialGenerator />
                </ProtectedRoute>
              } />
              <Route path="/create-exercises" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ExerciseBuilder />
                </ProtectedRoute>
              } />
              <Route path="/create-assessment" element={<AssessmentCreator />} />
              <Route path="/library" element={<MaterialsLibrary />} />
              <Route path="/profile" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <UserProfile />
                </ProtectedRoute>
              } />
              
              {/* Rota 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Navigate to="/login" replace />
          )}
        </Box>
        
        <Footer />
      </Box>
    </Router>
  );
}

// Componente de rota protegida
const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default App;
