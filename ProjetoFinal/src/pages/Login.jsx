import { Box, Container, Center } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

const Login = ({ onLogin }) => {
  return (
    <Container maxW="container.xl" py={12}>
      <Center>
        <LoginForm onLogin={onLogin} />
      </Center>
    </Container>
  );
};

export default Login;