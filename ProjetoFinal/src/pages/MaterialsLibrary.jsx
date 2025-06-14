import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  VStack,
  HStack,
  Divider,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tag,
  TagLabel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast
} from '@chakra-ui/react';
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaEllipsisV, 
  FaFileAlt, 
  FaClipboardList,
  FaChartBar,
  FaDownload,
  FaShare,
  FaEdit,
  FaTrash,
  FaStar,
  FaFolderOpen,
  FaPlus,
  FaEye
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const MaterialsLibrary = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    discipline: 'all',
    gradeLevel: 'all'
  });
  const [sortOption, setSortOption] = useState('recent');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  // Dados de exemplo para materiais
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Texto sobre Sistema Solar',
      type: 'material',
      discipline: 'Ciências',
      gradeLevel: '5º ano - Ensino Fundamental',
      createdAt: '2025-06-12T15:30:00Z',
      updatedAt: '2025-06-12T15:30:00Z',
      tags: ['astronomia', 'sistema solar', 'planetas'],
      favorite: true,
      description: 'Texto didático explicando o sistema solar, os planetas e suas características principais.'
    },
    {
      id: 2,
      title: 'Exercícios de Frações',
      type: 'exercise',
      discipline: 'Matemática',
      gradeLevel: '4º ano - Ensino Fundamental',
      createdAt: '2025-06-10T09:45:00Z',
      updatedAt: '2025-06-10T09:45:00Z',
      tags: ['frações', 'matemática básica'],
      favorite: false,
      description: 'Lista com 15 exercícios sobre operações com frações, adaptados para o nível fundamental.'
    },
    {
      id: 3,
      title: 'Avaliação Trimestral de Português',
      type: 'assessment',
      discipline: 'Língua Portuguesa',
      gradeLevel: '7º ano - Ensino Fundamental',
      createdAt: '2025-06-05T13:20:00Z',
      updatedAt: '2025-06-05T13:20:00Z',
      tags: ['avaliação', 'interpretação', 'gramática'],
      favorite: true,
      description: 'Avaliação completa com questões de interpretação de texto, gramática e produção textual.'
    },
    {
      id: 4,
      title: 'Texto sobre Revolução Industrial',
      type: 'material',
      discipline: 'História',
      gradeLevel: '8º ano - Ensino Fundamental',
      createdAt: '2025-06-03T10:15:00Z',
      updatedAt: '2025-06-03T10:15:00Z',
      tags: ['revolução industrial', 'século XVIII', 'história moderna'],
      favorite: false,
      description: 'Material didático sobre a Revolução Industrial, suas causas, desenvolvimento e consequências.'
    },
    {
      id: 5,
      title: 'Exercícios sobre Seres Vivos',
      type: 'exercise',
      discipline: 'Ciências',
      gradeLevel: '3º ano - Ensino Fundamental',
      createdAt: '2025-05-28T14:00:00Z',
      updatedAt: '2025-05-28T16:30:00Z',
      tags: ['biologia', 'seres vivos', 'classificação'],
      favorite: false,
      description: 'Conjunto de atividades sobre os diferentes tipos de seres vivos e suas características.'
    },
    {
      id: 6,
      title: 'Avaliação de Geografia - Relevo e Hidrografia',
      type: 'assessment',
      discipline: 'Geografia',
      gradeLevel: '6º ano - Ensino Fundamental',
      createdAt: '2025-05-20T11:00:00Z',
      updatedAt: '2025-05-20T11:00:00Z',
      tags: ['geografia física', 'relevo', 'hidrografia'],
      favorite: true,
      description: 'Prova sobre relevo brasileiro e principais bacias hidrográficas do Brasil.'
    },
    {
      id: 7,
      title: 'Texto sobre Verbos no Presente do Indicativo',
      type: 'material',
      discipline: 'Língua Portuguesa',
      gradeLevel: '4º ano - Ensino Fundamental',
      createdAt: '2025-05-15T09:30:00Z',
      updatedAt: '2025-05-15T09:30:00Z',
      tags: ['gramática', 'verbos', 'português'],
      favorite: false,
      description: 'Material explicativo sobre conjugação de verbos no presente do indicativo.'
    },
    {
      id: 8,
      title: 'Exercícios sobre Geometria Plana',
      type: 'exercise',
      discipline: 'Matemática',
      gradeLevel: '9º ano - Ensino Fundamental',
      createdAt: '2025-05-10T13:45:00Z',
      updatedAt: '2025-05-10T13:45:00Z',
      tags: ['geometria', 'áreas', 'perímetros'],
      favorite: true,
      description: 'Lista de problemas envolvendo cálculo de áreas e perímetros de figuras planas.'
    }
  ]);

  // Lista de disciplinas, níveis e tipos para filtros
  const disciplines = ['Língua Portuguesa', 'Matemática', 'Ciências', 'História', 'Geografia'];
  const gradeLevels = [
    '1º ano - Ensino Fundamental',
    '2º ano - Ensino Fundamental',
    '3º ano - Ensino Fundamental',
    '4º ano - Ensino Fundamental',
    '5º ano - Ensino Fundamental',
    '6º ano - Ensino Fundamental',
    '7º ano - Ensino Fundamental',
    '8º ano - Ensino Fundamental',
    '9º ano - Ensino Fundamental',
    '1º ano - Ensino Médio',
    '2º ano - Ensino Médio',
    '3º ano - Ensino Médio'
  ];
  const materialTypes = [
    { value: 'material', label: 'Materiais Didáticos' },
    { value: 'exercise', label: 'Exercícios' },
    { value: 'assessment', label: 'Avaliações' }
  ];

  // Contadores para o dashboard
  const materialCount = materials.filter(item => item.type === 'material').length;
  const exerciseCount = materials.filter(item => item.type === 'exercise').length;
  const assessmentCount = materials.filter(item => item.type === 'assessment').length;

  // Função para filtrar os materiais
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedFilters.type === 'all' || material.type === selectedFilters.type;
    const matchesDiscipline = selectedFilters.discipline === 'all' || material.discipline === selectedFilters.discipline;
    const matchesGradeLevel = selectedFilters.gradeLevel === 'all' || material.gradeLevel === selectedFilters.gradeLevel;
    
    return matchesSearch && matchesType && matchesDiscipline && matchesGradeLevel;
  });

  // Função para ordenar os materiais
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortOption) {
      case 'recent':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value
    });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleViewDetail = (material) => {
    setSelectedMaterial(material);
    onOpen();
  };

  const handleToggleFavorite = (id) => {
    setMaterials(materials.map(material => 
      material.id === id ? {...material, favorite: !material.favorite} : material
    ));
    
    const material = materials.find(m => m.id === id);
    
    toast({
      title: material.favorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      status: material.favorite ? 'info' : 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter(material => material.id !== id));
    
    toast({
      title: 'Material excluído',
      description: 'O material foi removido da sua biblioteca.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleExport = (id, format) => {
    const material = materials.find(m => m.id === id);
    
    toast({
      title: `Exportando ${material.title}`,
      description: `O material será exportado como ${format.toUpperCase()}.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // Determinar o ícone e cor com base no tipo de material
  const getTypeIcon = (type) => {
    switch (type) {
      case 'material':
        return { icon: FaFileAlt, color: 'blue.500' };
      case 'exercise':
        return { icon: FaClipboardList, color: 'green.500' };
      case 'assessment':
        return { icon: FaChartBar, color: 'purple.500' };
      default:
        return { icon: FaFileAlt, color: 'gray.500' };
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'material':
        return 'Material Didático';
      case 'exercise':
        return 'Lista de Exercícios';
      case 'assessment':
        return 'Avaliação';
      default:
        return 'Outro';
    }
  };

  // Formatar data em formato amigável
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={2}>Biblioteca de Materiais</Heading>
      <Text color="gray.600" mb={8}>
        Todos os seus materiais didáticos, exercícios e avaliações
      </Text>

      <Tabs colorScheme="brand" variant="enclosed" mb={6}>
        <TabList>
          <Tab>Todos os Materiais</Tab>
          <Tab>Favoritos</Tab>
          <Tab>Recentes</Tab>
          <Tab>Por Disciplina</Tab>
        </TabList>
      </Tabs>
      
      {/* Dashboard cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <Card>
          <CardBody>
            <Flex align="center">
              <Box bg="blue.100" p={3} borderRadius="md" mr={4}>
                <Icon as={FaFileAlt} color="blue.500" boxSize={5} />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">Materiais Didáticos</Text>
                <Text fontSize="2xl" fontWeight="bold">{materialCount}</Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Flex align="center">
              <Box bg="green.100" p={3} borderRadius="md" mr={4}>
                <Icon as={FaClipboardList} color="green.500" boxSize={5} />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">Exercícios</Text>
                <Text fontSize="2xl" fontWeight="bold">{exerciseCount}</Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Flex align="center">
              <Box bg="purple.100" p={3} borderRadius="md" mr={4}>
                <Icon as={FaChartBar} color="purple.500" boxSize={5} />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">Avaliações</Text>
                <Text fontSize="2xl" fontWeight="bold">{assessmentCount}</Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Flex align="center" justify="space-between">
              <Box flex={1}>
                <Text fontSize="sm" color="gray.600">Total</Text>
                <Text fontSize="2xl" fontWeight="bold">{materials.length}</Text>
              </Box>
              <Button 
                as={RouterLink}
                to="/dashboard"
                colorScheme="brand" 
                size="sm"
                leftIcon={<Icon as={FaPlus} />}
              >
                Criar Novo
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Search and filters */}
      <Box bg="white" p={4} borderRadius="lg" boxShadow="md" mb={6}>
        <VStack spacing={4} align="stretch">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder="Buscar materiais, exercícios ou avaliações..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            gap={4} 
            justify="space-between" 
            align={{ base: 'stretch', md: 'center' }}
          >
            <HStack spacing={4} flex="3">
              <Select 
                placeholder="Tipo"
                value={selectedFilters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                maxW="200px"
              >
                <option value="all">Todos os tipos</option>
                {materialTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </Select>
              
              <Select 
                placeholder="Disciplina"
                value={selectedFilters.discipline}
                onChange={(e) => handleFilterChange('discipline', e.target.value)}
                maxW="200px"
              >
                <option value="all">Todas as disciplinas</option>
                {disciplines.map((discipline, idx) => (
                  <option key={idx} value={discipline}>{discipline}</option>
                ))}
              </Select>
              
              <Select 
                placeholder="Nível de Ensino"
                value={selectedFilters.gradeLevel}
                onChange={(e) => handleFilterChange('gradeLevel', e.target.value)}
                maxW="250px"
              >
                <option value="all">Todos os níveis</option>
                {gradeLevels.map((level, idx) => (
                  <option key={idx} value={level}>{level}</option>
                ))}
              </Select>
            </HStack>
            
            <HStack spacing={4} flex="1" justify="flex-end">
              <Select 
                leftIcon={<FaSortAmountDown />}
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                maxW="180px"
              >
                <option value="recent">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
                <option value="title-asc">Título (A-Z)</option>
                <option value="title-desc">Título (Z-A)</option>
              </Select>
              
              <HStack>
                <IconButton
                  aria-label="Grid view"
                  icon={<FaFolderOpen />}
                  colorScheme={viewMode === 'grid' ? 'brand' : 'gray'}
                  variant={viewMode === 'grid' ? 'solid' : 'outline'}
                  onClick={() => setViewMode('grid')}
                />
                <IconButton
                  aria-label="List view"
                  icon={<FaClipboardList />}
                  colorScheme={viewMode === 'list' ? 'brand' : 'gray'}
                  variant={viewMode === 'list' ? 'solid' : 'outline'}
                  onClick={() => setViewMode('list')}
                />
              </HStack>
            </HStack>
          </Flex>
        </VStack>
      </Box>

      {/* Results count */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text color="gray.600">
          {sortedMaterials.length} {sortedMaterials.length === 1 ? 'item' : 'itens'} encontrados
        </Text>
      </Flex>

      {/* Materials Grid View */}
      {viewMode === 'grid' && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {sortedMaterials.map(material => {
            const typeInfo = getTypeIcon(material.type);
            return (
              <Card key={material.id} border="1px" borderColor="gray.200" boxShadow="sm">
                <CardHeader pb={0}>
                  <Flex justify="space-between" align="center">
                    <HStack>
                      <Box bg={`${typeInfo.color.split('.')[0]}.100`} p={2} borderRadius="md">
                        <Icon as={typeInfo.icon} color={typeInfo.color} />
                      </Box>
                      <Badge colorScheme={
                        material.type === 'material' ? 'blue' : 
                        material.type === 'exercise' ? 'green' : 'purple'
                      }>
                        {getTypeLabel(material.type)}
                      </Badge>
                    </HStack>
                    <IconButton
                      size="sm"
                      icon={<FaStar />}
                      aria-label="Favoritar"
                      variant="ghost"
                      color={material.favorite ? "yellow.400" : "gray.300"}
                      onClick={() => handleToggleFavorite(material.id)}
                    />
                  </Flex>
                </CardHeader>
                
                <CardBody>
                  <VStack align="start" spacing={2}>
                    <Heading size="md" onClick={() => handleViewDetail(material)} cursor="pointer">
                      {material.title}
                    </Heading>
                    
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {material.description}
                    </Text>
                    
                    <HStack>
                      <Badge colorScheme="cyan">{material.discipline}</Badge>
                      <Badge colorScheme="teal">{material.gradeLevel.split(' - ')[0]}</Badge>
                    </HStack>
                    
                    <HStack mt={2} wrap="wrap">
                      {material.tags.slice(0, 3).map((tag, idx) => (
                        <Tag key={idx} size="sm" colorScheme="gray" borderRadius="full">
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      ))}
                      {material.tags.length > 3 && (
                        <Tag size="sm" colorScheme="gray" borderRadius="full">
                          <TagLabel>+{material.tags.length - 3}</TagLabel>
                        </Tag>
                      )}
                    </HStack>
                  </VStack>
                </CardBody>
                
                <CardFooter pt={0}>
                  <Flex justify="space-between" align="center" width="100%">
                    <Text fontSize="xs" color="gray.500">
                      Atualizado em {formatDate(material.updatedAt)}
                    </Text>
                    
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Opções"
                        icon={<FaEllipsisV />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem icon={<FaEye />} onClick={() => handleViewDetail(material)}>
                          Visualizar
                        </MenuItem>
                        <MenuItem icon={<FaEdit />} as={RouterLink} to={`/edit/${material.id}`}>
                          Editar
                        </MenuItem>
                        <MenuItem icon={<FaDownload />} onClick={() => handleExport(material.id, 'pdf')}>
                          Exportar como PDF
                        </MenuItem>
                        <MenuItem icon={<FaDownload />} onClick={() => handleExport(material.id, 'docx')}>
                          Exportar como DOCX
                        </MenuItem>
                        <MenuItem icon={<FaShare />}>Compartilhar</MenuItem>
                        <MenuItem icon={<FaTrash />} color="red.500" onClick={() => handleDelete(material.id)}>
                          Excluir
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      )}

      {/* Materials List View */}
      {viewMode === 'list' && (
        <VStack spacing={3} align="stretch">
          {sortedMaterials.map(material => {
            const typeInfo = getTypeIcon(material.type);
            return (
              <Card key={material.id} direction="row" overflow="hidden" variant="outline">
                <Box 
                  bg={`${typeInfo.color.split('.')[0]}.100`} 
                  p={4} 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  width="60px"
                >
                  <Icon as={typeInfo.icon} boxSize={6} color={typeInfo.color} />
                </Box>
                
                <Stack flex="1">
                  <CardBody py={3}>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Heading size="sm" onClick={() => handleViewDetail(material)} cursor="pointer">
                          {material.title}
                        </Heading>
                        <HStack mt={1} spacing={2}>
                          <Badge colorScheme={
                            material.type === 'material' ? 'blue' : 
                            material.type === 'exercise' ? 'green' : 'purple'
                          } size="sm">
                            {getTypeLabel(material.type)}
                          </Badge>
                          <Badge colorScheme="cyan" size="sm">{material.discipline}</Badge>
                          <Badge colorScheme="teal" size="sm">{material.gradeLevel.split(' - ')[0]}</Badge>
                          <Text fontSize="xs" color="gray.500">
                            Atualizado em {formatDate(material.updatedAt)}
                          </Text>
                        </HStack>
                      </Box>
                      
                      <HStack>
                        <IconButton
                          size="sm"
                          icon={<FaStar />}
                          aria-label="Favoritar"
                          variant="ghost"
                          color={material.favorite ? "yellow.400" : "gray.300"}
                          onClick={() => handleToggleFavorite(material.id)}
                        />
                        <IconButton
                          size="sm"
                          icon={<FaEdit />}
                          aria-label="Editar"
                          variant="ghost"
                          as={RouterLink}
                          to={`/edit/${material.id}`}
                        />
                        <IconButton
                          size="sm"
                          icon={<FaEye />}
                          aria-label="Visualizar"
                          variant="ghost"
                          onClick={() => handleViewDetail(material)}
                        />
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Opções"
                            icon={<FaEllipsisV />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem icon={<FaDownload />} onClick={() => handleExport(material.id, 'pdf')}>
                              Exportar como PDF
                            </MenuItem>
                            <MenuItem icon={<FaDownload />} onClick={() => handleExport(material.id, 'docx')}>
                              Exportar como DOCX
                            </MenuItem>
                            <MenuItem icon={<FaShare />}>Compartilhar</MenuItem>
                            <MenuItem icon={<FaTrash />} color="red.500" onClick={() => handleDelete(material.id)}>
                              Excluir
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </HStack>
                    </Flex>
                  </CardBody>
                </Stack>
              </Card>
            );
          })}
        </VStack>
      )}

      {sortedMaterials.length === 0 && (
        <Box 
          textAlign="center" 
          p={10} 
          bg="white" 
          borderRadius="lg" 
          boxShadow="md"
        >
          <Icon as={FaSearch} boxSize={10} color="gray.300" mb={4} />
          <Heading size="md" mb={2} color="gray.500">Nenhum material encontrado</Heading>
          <Text mb={6}>
            Não encontramos materiais com os critérios selecionados. Tente mudar os filtros ou criar um novo material.
          </Text>
          <Button 
            as={RouterLink}
            to="/generate-material"
            colorScheme="brand" 
            leftIcon={<Icon as={FaPlus} />}
          >
            Criar Novo Material
          </Button>
        </Box>
      )}

      {/* Material Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          {selectedMaterial && (
            <>
              <ModalHeader>
                <HStack>
                  <Text>{selectedMaterial.title}</Text>
                  <Badge colorScheme={
                    selectedMaterial.type === 'material' ? 'blue' : 
                    selectedMaterial.type === 'exercise' ? 'green' : 'purple'
                  }>
                    {getTypeLabel(selectedMaterial.type)}
                  </Badge>
                </HStack>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Text fontWeight="bold" mb={1}>Descrição:</Text>
                    <Text>{selectedMaterial.description}</Text>
                  </Box>
                  
                  <Divider />
                  
                  <SimpleGrid columns={2} spacing={4} width="100%">
                    <Box>
                      <Text fontWeight="bold" mb={1}>Disciplina:</Text>
                      <Text>{selectedMaterial.discipline}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" mb={1}>Nível de Ensino:</Text>
                      <Text>{selectedMaterial.gradeLevel}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" mb={1}>Data de Criação:</Text>
                      <Text>{formatDate(selectedMaterial.createdAt)}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" mb={1}>Última Atualização:</Text>
                      <Text>{formatDate(selectedMaterial.updatedAt)}</Text>
                    </Box>
                  </SimpleGrid>
                  
                  <Box width="100%">
                    <Text fontWeight="bold" mb={1}>Tags:</Text>
                    <Flex wrap="wrap" gap={2}>
                      {selectedMaterial.tags.map((tag, idx) => (
                        <Tag key={idx} size="md" colorScheme="gray" borderRadius="full">
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  </Box>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <HStack spacing={3}>
                  <Button 
                    leftIcon={<FaDownload />} 
                    onClick={() => handleExport(selectedMaterial.id, 'pdf')}
                    variant="outline"
                  >
                    PDF
                  </Button>
                  <Button 
                    leftIcon={<FaDownload />} 
                    onClick={() => handleExport(selectedMaterial.id, 'docx')}
                    variant="outline"
                  >
                    DOCX
                  </Button>
                  <Button 
                    leftIcon={<FaEdit />}
                    as={RouterLink}
                    to={`/edit/${selectedMaterial.id}`}
                    colorScheme="brand"
                  >
                    Editar
                  </Button>
                </HStack>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MaterialsLibrary;