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
import About from './pages/About'; // Importando a página About

// Serviços
import authService from './services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());

  useEffect(() => {
    // Verificar autenticação ao montar o componente
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      console.log('Verificando autenticação:', isAuth);
      setIsLoggedIn(isAuth);
    };
    
    checkAuth();
    
    // Monitorar mudanças no localStorage para detectar login/logout
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = (userData) => {
    console.log('Login bem-sucedido, atualizando estado', userData);
    // Atualizar estado de autenticação
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    // Usar navigate em vez de window.location para preservar o estado do React
    // Você pode adicionar este código para garantir que o usuário seja redirecionado
    // para a página de login após o logout
    window.location.href = '/login';
  };

  return (
    <Router>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        
        <Box flex="1">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/register" element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />  /* Removida prop onLogin */
            } />
            <Route path="/sobre" element={<About />} /> {/* Rota para a página About */}
            
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
            <Route path="/create-assessment" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AssessmentCreator />
              </ProtectedRoute>
            } />
            <Route path="/library" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MaterialsLibrary />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
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
