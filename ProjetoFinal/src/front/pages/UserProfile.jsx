import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  IconButton,
  Badge,
  Switch,
  FormHelperText,
  useToast,
  Divider
} from '@chakra-ui/react';
import { FaCamera, FaUniversity, FaGraduationCap, FaLinkedin, FaGithub } from 'react-icons/fa';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    biography: 'Estudante de Engenharia de Software interessado em desenvolvimento web e inteligência artificial.',
    location: 'São Paulo, SP',
    university: 'Universidade de São Paulo',
    degree: 'Engenharia de Software',
    gradYear: '2026',
    linkedin: 'linkedin.com/in/joaosilva',
    github: 'github.com/joaosilva',
    notificationsEmail: true,
    notificationsAssignments: true,
    notificationsNews: false
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveProfile = () => {
    // Aqui você implementaria a lógica para salvar no backend
    setTimeout(() => {
      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram salvas com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    }, 1000);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Grid 
        templateColumns={{ base: '1fr', md: '250px 1fr' }} 
        gap={8}
      >
        <GridItem>
          <VStack spacing={5} align="center">
            <Box position="relative">
              <Avatar
                size="2xl"
                name={userData.name}
                src="https://bit.ly/broken-link"
                border="3px solid"
                borderColor="brand.500"
              />
              <IconButton
                aria-label="Alterar foto"
                icon={<FaCamera />}
                isRound
                size="sm"
                colorScheme="brand"
                position="absolute"
                bottom="0"
                right="0"
              />
            </Box>

            <Box textAlign="center">
              <Heading size="md">{userData.name}</Heading>
              <Text color="gray.600" fontSize="sm">{userData.email}</Text>
            </Box>

            <HStack spacing={4}>
              <Badge colorScheme="green">Estudante</Badge>
              <Badge colorScheme="blue">Front-end</Badge>
            </HStack>

            <VStack spacing={2} align="start" w="full">
              <HStack>
                <FaUniversity />
                <Text fontSize="sm">{userData.university}</Text>
              </HStack>
              <HStack>
                <FaGraduationCap />
                <Text fontSize="sm">{userData.degree}, {userData.gradYear}</Text>
              </HStack>
            </VStack>

            <HStack spacing={3} mt={2}>
              <IconButton
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                isRound
                size="sm"
                colorScheme="linkedin"
              />
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                isRound
                size="sm"
                colorScheme="gray"
              />
            </HStack>

            {!isEditing && (
              <Button 
                colorScheme="brand" 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                w="full"
              >
                Editar Perfil
              </Button>
            )}
          </VStack>
        </GridItem>

        <GridItem>
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Tabs colorScheme="brand">
              <TabList>
                <Tab>Perfil</Tab>
                <Tab>Segurança</Tab>
                <Tab>Notificações</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">Informações Pessoais</Heading>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <FormControl>
                        <FormLabel>Nome completo</FormLabel>
                        <Input 
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          isReadOnly={!isEditing}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input 
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          isReadOnly
                        />
                      </FormControl>
                      
                      <FormControl gridColumn={{ md: 'span 2' }}>
                        <FormLabel>Biografia</FormLabel>
                        <Textarea 
                          name="biography"
                          value={userData.biography}
                          onChange={handleInputChange}
                          isReadOnly={!isEditing}
                          rows={4}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Localização</FormLabel>
                        <Input 
                          name="location"
                          value={userData.location}
                          onChange={handleInputChange}
                          isReadOnly={!isEditing}
                        />
                      </FormControl>
                    </Grid>
                    
                    <Divider my={4} />
                    
                    <Heading size="md">Informações Acadêmicas</Heading>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <FormControl>
                        <FormLabel>Universidade/Instituição</FormLabel>
                        <Input 
                          name="university"
                          value={userData.university}
                          onChange={handleInputChange}
                          isReadOnly={!isEditing}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Curso</FormLabel>
                        <Input 
                          name="degree"
                          value={userData.degree}
                          onChange={handleInputChange}
                          isReadOnly={!isEditing}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Ano de graduação</FormLabel>
                        <Select 
                          name="gradYear"
                          value={userData.gradYear}
                          onChange={handleInputChange}
                          isDisabled={!isEditing}
                        >
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Divider my={4} />
                    
                    <Heading size="md">Links</Heading>
                    
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                      <FormControl>
                        <FormLabel>LinkedIn</FormLabel>
                        <Input 
                          name="linkedin"
                          value={userData.linkedin}
                          onChange={handleInputChange}
                          isReadOnly={!isEditing}
                          placeholder="seu-perfil"
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>GitHub</FormLabel>
                        <Input 
                          name="github"
                          value={userData.github}
                          onChange={handleInputChange}
                          isReadOnly={!isEditing}
                          placeholder="seu-usuario"
                        />
                      </FormControl>
                    </Grid>
                    
                    {isEditing && (
                      <HStack spacing={4} pt={6} justify="flex-end">
                        <Button 
                          variant="ghost" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          colorScheme="brand" 
                          onClick={handleSaveProfile}
                        >
                          Salvar alterações
                        </Button>
                      </HStack>
                    )}
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">Segurança da Conta</Heading>
                    
                    <Box>
                      <Button colorScheme="brand">Alterar senha</Button>
                      <Text fontSize="sm" color="gray.600" mt={2}>
                        Recomendamos alterar sua senha a cada 3 meses para maior segurança.
                      </Text>
                    </Box>
                    
                    <Divider my={2} />
                    
                    <Box>
                      <Button colorScheme="yellow" variant="outline">
                        Autenticação em duas etapas
                      </Button>
                      <Text fontSize="sm" color="gray.600" mt={2}>
                        Adicione uma camada extra de segurança à sua conta.
                      </Text>
                    </Box>
                    
                    <Divider my={2} />
                    
                    <Box>
                      <Button colorScheme="red" variant="outline">
                        Excluir minha conta
                      </Button>
                      <Text fontSize="sm" color="gray.600" mt={2}>
                        Esta ação é permanente e não pode ser desfeita.
                      </Text>
                    </Box>
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md">Preferências de Notificação</Heading>
                    
                    <FormControl display="flex" alignItems="center">
                      <Switch 
                        id="email-notifications" 
                        colorScheme="brand"
                        name="notificationsEmail"
                        isChecked={userData.notificationsEmail}
                        onChange={handleInputChange}
                        mr={3}
                      />
                      <FormLabel htmlFor="email-notifications" mb="0">
                        Notificações por email
                      </FormLabel>
                    </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <Switch 
                        id="assignment-notifications" 
                        colorScheme="brand"
                        name="notificationsAssignments"
                        isChecked={userData.notificationsAssignments}
                        onChange={handleInputChange}
                        mr={3}
                      />
                      <Box>
                        <FormLabel htmlFor="assignment-notifications" mb="0">
                          Lembretes de prazos de atividades
                        </FormLabel>
                        <FormHelperText ml="44px">
                          Receba lembretes 24h antes dos prazos.
                        </FormHelperText>
                      </Box>
                    </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <Switch 
                        id="news-notifications" 
                        colorScheme="brand"
                        name="notificationsNews"
                        isChecked={userData.notificationsNews}
                        onChange={handleInputChange}
                        mr={3}
                      />
                      <Box>
                        <FormLabel htmlFor="news-notifications" mb="0">
                          Novidades e atualizações
                        </FormLabel>
                        <FormHelperText ml="44px">
                          Fique por dentro de novos cursos e recursos.
                        </FormHelperText>
                      </Box>
                    </FormControl>
                    
                    <Button 
                      colorScheme="brand" 
                      alignSelf="flex-end" 
                      mt={4}
                      onClick={handleSaveProfile}
                    >
                      Salvar preferências
                    </Button>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default UserProfile;