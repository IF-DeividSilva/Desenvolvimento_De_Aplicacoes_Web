import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Button, 
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Stack,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  FaFileAlt, 
  FaClipboardList, 
  FaChartBar, 
  FaPlus,
  FaRegCalendarAlt,
  FaBook,
  FaFileExport,
  FaCogs
} from 'react-icons/fa';

const Dashboard = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading mb={2}>Dashboard do Professor</Heading>
          <Text color="gray.600">
            Gerencie seus materiais didáticos e acompanhe suas estatísticas
          </Text>
        </Box>
        <Button 
          as={RouterLink} 
          to="/generate-material" 
          colorScheme="brand" 
          leftIcon={<Icon as={FaPlus} />}
          size="md"
        >
          Novo Material
        </Button>
      </Flex>
      
      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
        <StatCard 
          icon={FaFileAlt} 
          title="Materiais Criados" 
          value={24} 
          helpText="Último mês: 6"
        />
        <StatCard 
          icon={FaClipboardList} 
          title="Exercícios" 
          value={85} 
          helpText="Último mês: 12"
        />
        <StatCard 
          icon={FaChartBar} 
          title="Avaliações" 
          value={14} 
          helpText="Último mês: 3"
        />
        <StatCard 
          icon={FaFileExport} 
          title="Exportações" 
          value={36} 
          helpText="Último mês: 8"
        />
      </SimpleGrid>

      {/* Quick Actions */}
      <Box mb={10}>
        <Heading size="md" mb={4}>Ações Rápidas</Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
          <ActionCard 
            title="Gerar Material" 
            icon={FaFileAlt} 
            description="Crie novos textos e materiais didáticos" 
            link="/generate-material" 
          />
          <ActionCard 
            title="Criar Exercícios" 
            icon={FaClipboardList} 
            description="Desenvolva exercícios personalizados" 
            link="/create-exercises" 
          />
          <ActionCard 
            title="Montar Avaliação" 
            icon={FaChartBar} 
            description="Elabore avaliações adaptativas" 
            link="/create-assessment" 
          />
          <ActionCard 
            title="Acessar Biblioteca" 
            icon={FaBook} 
            description="Veja seus materiais salvos" 
            link="/library" 
          />
        </SimpleGrid>
      </Box>

      {/* Recent Materials */}
      <Box mb={10}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">Materiais Recentes</Heading>
          <Button 
            as={RouterLink} 
            to="/library" 
            variant="ghost" 
            colorScheme="brand" 
            size="sm"
          >
            Ver todos
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <RecentMaterialCard 
            title="Texto sobre Sistema Solar" 
            type="Texto Didático" 
            date="12/06/2025"
            discipline="Ciências"
          />
          <RecentMaterialCard 
            title="Exercícios de Frações" 
            type="Lista de Exercícios" 
            date="10/06/2025" 
            discipline="Matemática"
          />
          <RecentMaterialCard 
            title="Avaliação Trimestral" 
            type="Avaliação" 
            date="05/06/2025"
            discipline="Língua Portuguesa"
          />
        </SimpleGrid>
      </Box>

      {/* Integration with AI Tools */}
      <Box>
        <Heading size="md" mb={4}>Ferramentas de IA</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card>
            <CardBody>
              <Flex align="center" mb={4}>
                <Icon as={FaRegCalendarAlt} boxSize={6} color="brand.500" mr={4} />
                <Heading size="sm">Planejamento Pedagógico</Heading>
              </Flex>
              <Text>Use IA para criar planejamentos de aula adaptados aos seus objetivos pedagógicos.</Text>
            </CardBody>
            <CardFooter pt={0}>
              <Button variant="outline" colorScheme="brand" size="sm" as={RouterLink} to="/ai-planning">
                Começar
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardBody>
              <Flex align="center" mb={4}>
                <Icon as={FaCogs} boxSize={6} color="brand.500" mr={4} />
                <Heading size="sm">Configurações de IA</Heading>
              </Flex>
              <Text>Ajuste as configurações de IA para personalizar a geração de conteúdo.</Text>
            </CardBody>
            <CardFooter pt={0}>
              <Button variant="outline" colorScheme="brand" size="sm" as={RouterLink} to="/ai-settings">
                Configurar
              </Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Box>
    </Container>
  );
};

// Componentes auxiliares
const StatCard = ({ icon, title, value, helpText }) => (
  <Stat 
    px={4} 
    py={3} 
    bg="white" 
    borderRadius="lg" 
    boxShadow="md"
  >
    <Flex justify="space-between">
      <Box>
        <StatLabel fontWeight="medium">{title}</StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold">{value}</StatNumber>
        <StatHelpText mb={0}>{helpText}</StatHelpText>
      </Box>
      <Box 
        bg="brand.500" 
        p={2} 
        borderRadius="md" 
        color="white" 
        alignSelf="center"
      >
        <Icon as={icon} boxSize={5} />
      </Box>
    </Flex>
  </Stat>
);

const ActionCard = ({ title, description, icon, link }) => (
  <Card 
    as={RouterLink}
    to={link}
    _hover={{
      transform: 'translateY(-5px)',
      boxShadow: 'lg',
      transition: 'all 0.3s ease'
    }}
  >
    <CardBody>
      <Box 
        bg="brand.50" 
        p={3} 
        borderRadius="md" 
        width="fit-content" 
        mb={3}
      >
        <Icon as={icon} color="brand.500" boxSize={5} />
      </Box>
      <Stack spacing={1}>
        <Heading size="sm">{title}</Heading>
        <Text fontSize="sm" color="gray.600">{description}</Text>
      </Stack>
    </CardBody>
  </Card>
);

const RecentMaterialCard = ({ title, type, date, discipline }) => (
  <Card>
    <CardHeader pb={1}>
      <Heading size="sm">{title}</Heading>
    </CardHeader>
    <CardBody py={2}>
      <Text color="gray.600" fontSize="sm">
        Tipo: {type}
      </Text>
      <Text color="gray.600" fontSize="sm">
        Disciplina: {discipline}
      </Text>
    </CardBody>
    <CardFooter pt={0}>
      <Flex width="100%" justify="space-between" align="center">
        <Text fontSize="xs" color="gray.500">
          <Icon as={FaRegCalendarAlt} mr={1} boxSize={3} />
          {date}
        </Text>
        <Button size="xs" colorScheme="brand" variant="outline">
          Visualizar
        </Button>
      </Flex>
    </CardFooter>
  </Card>
);

export default Dashboard;