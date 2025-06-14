import { Box, Container, Center } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box as ChakraBox,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link,
  VStack,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  useToast,
  Checkbox
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Você deve concordar com os termos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você faria a chamada real de registro
      onLogin({ email: formData.email });
      
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Bem-vindo à nossa plataforma de educação.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      navigate('/dashboard');
      
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message || 'Ocorreu um erro ao processar seu cadastro.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Center>
        <ChakraBox 
          bg="white" 
          p={8} 
          borderRadius="lg" 
          boxShadow="lg" 
          w={{ base: "90%", sm: "450px" }}
        >
          <VStack spacing={6} align="stretch">
            <ChakraBox textAlign="center">
              <Heading size="lg" mb={2}>Crie sua conta</Heading>
              <Text color="gray.600">Entre para nossa comunidade de aprendizado</Text>
            </ChakraBox>
            
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Nome completo</FormLabel>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={errors.password}>
                  <FormLabel>Senha</FormLabel>
                  <InputGroup>
                    <Input 
                      type={showPassword ? 'text' : 'password'}
                      name="password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="********"
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        bg="transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={errors.confirmPassword}>
                  <FormLabel>Confirme a senha</FormLabel>
                  <Input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="********"
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={errors.agreeTerms}>
                  <Checkbox 
                    name="agreeTerms"
                    isChecked={formData.agreeTerms}
                    onChange={handleInputChange}
                    colorScheme="brand"
                  >
                    Concordo com os <Link color="brand.500">Termos de Serviço</Link> e <Link color="brand.500">Política de Privacidade</Link>
                  </Checkbox>
                  <FormErrorMessage>{errors.agreeTerms}</FormErrorMessage>
                </FormControl>
                
                <Button 
                  type="submit" 
                  colorScheme="brand" 
                  size="lg" 
                  w="full"
                  mt={4}
                  isLoading={isLoading}
                  loadingText="Criando conta..."
                >
                  Criar Conta
                </Button>
              </VStack>
            </form>
            
            <Text textAlign="center">
              Já tem uma conta?{" "}
              <Link 
                as={RouterLink} 
                to="/login" 
                color="brand.500" 
                fontWeight="medium"
              >
                Faça login
              </Link>
            </Text>
          </VStack>
        </ChakraBox>
      </Center>
    </Container>
  );
};

export default Register;