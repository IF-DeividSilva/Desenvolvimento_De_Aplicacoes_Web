import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Heading, 
  Text, 
  Link, 
  HStack,
  VStack,
  IconButton,
  Flex
} from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" mt={12}>
      <Container maxW="container.xl" px={4} pt={12}>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8} pb={8}>
          <Box>
            <Heading as="h3" size="md" mb={4}>EduPlataform</Heading>
            <Text color="gray.600" mb={4}>
              Transformando o futuro através da educação acessível e de qualidade.
            </Text>
            <HStack spacing={4}>
              <SocialButton icon={<FaFacebookF />} label="Facebook" />
              <SocialButton icon={<FaTwitter />} label="Twitter" />
              <SocialButton icon={<FaInstagram />} label="Instagram" />
              <SocialButton icon={<FaLinkedinIn />} label="LinkedIn" />
            </HStack>
          </Box>
          
          <Box>
            <Heading as="h4" size="sm" fontWeight="bold" mb={4}>Links rápidos</Heading>
            <VStack align="flex-start" spacing={3}>
              <FooterLink as={RouterLink} to="/">Home</FooterLink>
              <FooterLink as={RouterLink} to="/courses">Cursos</FooterLink>
              <FooterLink as={RouterLink} to="/assignments">Atividades</FooterLink>
              <FooterLink as={RouterLink} to="/login">Login</FooterLink>
            </VStack>
          </Box>
          
          <Box>
            <Heading as="h4" size="sm" fontWeight="bold" mb={4}>Recursos</Heading>
            <VStack align="flex-start" spacing={3}>
              <FooterLink href="#">Centro de ajuda</FooterLink>
              <FooterLink href="#">Blog educacional</FooterLink>
              <FooterLink href="#">Parcerias</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </VStack>
          </Box>
          
          <Box>
            <Heading as="h4" size="sm" fontWeight="bold" mb={4}>Contato</Heading>
            <VStack align="flex-start" spacing={3} color="gray.600">
              <Text>Email: arthurpetroli@alunos.utfpr.edu.br</Text>
              <Text>Telefone: (19) 98348-4303</Text>
              <Text>Endereço: R. Marcílio Dias, 635</Text>
            </VStack>
          </Box>
        </Grid>
      </Container>
      
      <Box bg="white" py={4} textAlign="center" color="gray.600">
        <Text>&copy; {new Date().getFullYear()} EduPlataform. Todos os direitos reservados.</Text>
      </Box>
    </Box>
  );
};

const SocialButton = ({ icon, label }) => {
  return (
    <IconButton
      aria-label={label}
      icon={icon}
      bg="brand.500"
      color="white"
      size="md"
      rounded="full"
      _hover={{ bg: "brand.600" }}
    />
  );
};

const FooterLink = ({ children, ...rest }) => {
  return (
    <Link 
      color="gray.600" 
      _hover={{ color: "brand.500" }} 
      {...rest}
    >
      {children}
    </Link>
  );
};

export default Footer;