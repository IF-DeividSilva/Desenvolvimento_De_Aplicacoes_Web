import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
  VStack,
  HStack,
  Stack,
  useToast,
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  Checkbox,
  Switch,
  Divider,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  RadioGroup,
  Radio,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaFileExport,
  FaSave,
  FaEye,
  FaCheck,
  FaStar,
  FaStarHalf,
  FaChevronDown,
  FaQuestionCircle,
  FaCalculator,
  FaRandom,
  FaFileImport,
  FaClock,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const AssessmentCreator = () => {
  const toast = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [previewExercise, setPreviewExercise] = useState(null);
  
  // Estados para a avaliação
  const [assessmentInfo, setAssessmentInfo] = useState({
    title: '',
    subject: '',
    gradeLevel: '',
    duration: '60',
    totalPoints: 10,
    assessmentType: '',
    instructions: '',
    includeHeader: true,
    includeFooter: true,
    includeAnswerKey: true
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Questões de Múltipla Escolha',
      instructions: 'Marque a alternativa correta.',
      points: 5,
      exercises: [
        {
          id: 101,
          question: 'Qual é a capital do Brasil?',
          options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Belo Horizonte'],
          correctAnswer: 2,
          points: 1,
          difficulty: 'easy',
          type: 'multiple-choice'
        },
        {
          id: 102,
          question: 'Quem escreveu "Dom Casmurro"?',
          options: ['José de Alencar', 'Machado de Assis', 'Carlos Drummond de Andrade', 'Jorge Amado'],
          correctAnswer: 1,
          points: 1,
          difficulty: 'medium',
          type: 'multiple-choice'
        }
      ]
    },
    {
      id: 2,
      title: 'Questões Dissertativas',
      instructions: 'Responda de forma completa e objetiva.',
      points: 5,
      exercises: [
        {
          id: 201,
          question: 'Explique o processo de fotossíntese e sua importância para os seres vivos.',
          expectedAnswer: 'A fotossíntese é o processo pelo qual plantas e alguns organismos convertem luz solar, água e dióxido de carbono em glicose e oxigênio...',
          points: 2.5,
          difficulty: 'hard',
          type: 'essay'
        },
        {
          id: 202,
          question: 'Cite as principais causas da Revolução Francesa e seus impactos na sociedade contemporânea.',
          expectedAnswer: 'A Revolução Francesa foi impulsionada por fatores como crise econômica, absolutismo monárquico, e influência iluminista...',
          points: 2.5,
          difficulty: 'hard',
          type: 'essay'
        }
      ]
    }
  ]);
  
  // Configuração de dificuldade da avaliação
  const [difficultyDistribution, setDifficultyDistribution] = useState({
    easy: 30,
    medium: 50,
    hard: 20
  });

  // Opções disponíveis
  const assessmentTypes = [
    'Avaliação Diagnóstica',
    'Prova Bimestral',
    'Avaliação Formativa',
    'Teste Adaptativo',
    'Simulado',
    'Recuperação'
  ];

  const subjects = [
    'Língua Portuguesa',
    'Matemática',
    'Ciências',
    'História',
    'Geografia',
    'Inglês',
    'Educação Física',
    'Artes'
  ];

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

  const exerciseBank = {
    'Língua Portuguesa': [
      {
        id: 301,
        question: 'Identifique a alternativa em que há um substantivo coletivo:',
        options: ['Casa, mesa', 'Pássaro, árvore', 'Manada, cardume', 'Beleza, amor'],
        correctAnswer: 2,
        points: 1,
        difficulty: 'medium',
        type: 'multiple-choice'
      },
      {
        id: 302,
        question: 'Analise o seguinte trecho e identifique o sujeito da oração: "Os alunos apresentaram um excelente projeto na feira de ciências."',
        options: ['Os alunos', 'Um excelente projeto', 'Na feira', 'De ciências'],
        correctAnswer: 0,
        points: 1,
        difficulty: 'medium',
        type: 'multiple-choice'
      },
      {
        id: 303,
        question: 'Escreva um parágrafo argumentativo defendendo a importância da leitura na formação do cidadão crítico.',
        expectedAnswer: 'O estudante deve apresentar argumentos claros sobre como a leitura contribui para o desenvolvimento do pensamento crítico...',
        points: 2,
        difficulty: 'hard',
        type: 'essay'
      }
    ],
    'Matemática': [
      {
        id: 401,
        question: 'Calcule o resultado da expressão: 3 + 4 × 2 - 5',
        options: ['6', '10', '11', '4'],
        correctAnswer: 0,
        points: 1,
        difficulty: 'easy',
        type: 'multiple-choice'
      },
      {
        id: 402,
        question: 'Um terreno retangular tem 12m de largura e 25m de comprimento. Qual é a área desse terreno?',
        options: ['300m²', '37m²', '120m²', '250m²'],
        correctAnswer: 0,
        points: 1,
        difficulty: 'easy',
        type: 'multiple-choice'
      },
      {
        id: 403,
        question: 'Resolva a equação: 2x + 5 = 15',
        expectedAnswer: 'x = 5',
        points: 1.5,
        difficulty: 'medium',
        type: 'calculation'
      }
    ]
  };

  // Funções para gerenciar os estados
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setAssessmentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setAssessmentInfo(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSectionChange = (sectionId, field, value) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    );
  };

  const addSection = () => {
    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    setSections([...sections, {
      id: newId,
      title: `Nova Seção ${newId}`,
      instructions: '',
      points: 0,
      exercises: []
    }]);
  };

  const removeSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const addExerciseToSection = (sectionId, exercise) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              exercises: [...section.exercises, {...exercise, id: Date.now()}] 
            } 
          : section
      )
    );
  };

  const removeExerciseFromSection = (sectionId, exerciseId) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              exercises: section.exercises.filter(ex => ex.id !== exerciseId) 
            } 
          : section
      )
    );
  };

  const handlePreviewExercise = (exercise) => {
    setPreviewExercise(exercise);
    onOpen();
  };

  const handleGenerateAssessment = () => {
    // Validar campos obrigatórios
    if (!assessmentInfo.title || !assessmentInfo.subject || !assessmentInfo.gradeLevel || !assessmentInfo.assessmentType) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simular geração de avaliação
    setTimeout(() => {
      // Aqui você adicionaria a lógica para gerar exercícios com IA
      // Por agora, vamos simplesmente adicionar exercícios do banco de exercícios
      
      const newSections = [];
      
      // Adicionar seção de múltipla escolha se tivermos exercícios disponíveis
      if (exerciseBank[assessmentInfo.subject]?.length > 0) {
        const multipleChoiceExercises = exerciseBank[assessmentInfo.subject]
          .filter(ex => ex.type === 'multiple-choice')
          .slice(0, 3); // Pegar até 3 exercícios
          
        if (multipleChoiceExercises.length > 0) {
          newSections.push({
            id: Date.now(),
            title: 'Questões de Múltipla Escolha',
            instructions: 'Marque a alternativa correta para cada questão.',
            points: multipleChoiceExercises.reduce((sum, ex) => sum + ex.points, 0),
            exercises: multipleChoiceExercises.map(ex => ({...ex, id: Date.now() + ex.id}))
          });
        }
        
        // Adicionar seção de questões dissertativas/cálculo se tivermos exercícios disponíveis
        const otherExercises = exerciseBank[assessmentInfo.subject]
          .filter(ex => ex.type !== 'multiple-choice')
          .slice(0, 2); // Pegar até 2 exercícios
          
        if (otherExercises.length > 0) {
          newSections.push({
            id: Date.now() + 1,
            title: 'Questões Dissertativas/Cálculos',
            instructions: 'Responda de forma completa as questões abaixo.',
            points: otherExercises.reduce((sum, ex) => sum + ex.points, 0),
            exercises: otherExercises.map(ex => ({...ex, id: Date.now() + ex.id}))
          });
        }
      }
      
      // Se não conseguimos gerar seções com o banco, manter as seções atuais
      setSections(newSections.length > 0 ? newSections : sections);
      setIsGenerating(false);
      
      toast({
        title: 'Avaliação gerada com sucesso!',
        description: 'A avaliação foi criada com base nos parâmetros fornecidos.',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    }, 2000);
  };

  const handleSaveAssessment = () => {
    // Verificar se há seções e exercícios
    if (sections.length === 0 || sections.every(section => section.exercises.length === 0)) {
      toast({
        title: 'Avaliação incompleta',
        description: 'Sua avaliação precisa ter pelo menos uma seção com exercícios.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }
    
    toast({
      title: 'Avaliação salva!',
      description: 'Sua avaliação foi salva na biblioteca.',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  const handleExport = (format) => {
    toast({
      title: `Exportando como ${format.toUpperCase()}`,
      description: 'Seu arquivo será baixado em instantes.',
      status: 'info',
      duration: 3000,
      isClosable: true
    });
  };

  // Função para calcular o total de pontos da avaliação
  const calculateTotalPoints = () => {
    return sections.reduce((total, section) => {
      return total + section.exercises.reduce((sectionTotal, exercise) => {
        return sectionTotal + (exercise.points || 0);
      }, 0);
    }, 0);
  };

  // Distribuição de questões por dificuldade
  const getDifficultyDistribution = () => {
    const distribution = {
      easy: 0,
      medium: 0,
      hard: 0,
      total: 0
    };
    
    sections.forEach(section => {
      section.exercises.forEach(exercise => {
        distribution[exercise.difficulty] = (distribution[exercise.difficulty] || 0) + 1;
        distribution.total += 1;
      });
    });
    
    return distribution;
  };
  
  const difficulty = getDifficultyDistribution();

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={2}>Criador de Avaliações</Heading>
      <Text color="gray.600" mb={8}>
        Crie avaliações personalizadas para diferentes níveis de ensino
      </Text>

      <Tabs colorScheme="brand" variant="enclosed">
        <TabList>
          <Tab>Configuração</Tab>
          <Tab>Estrutura e Questões</Tab>
          <Tab>Visualização e Exportação</Tab>
        </TabList>

        <TabPanels>
          {/* Aba de Configuração */}
          <TabPanel px={0} pt={6}>
            <Flex 
              direction={{ base: 'column', lg: 'row' }} 
              gap={8}
            >
              <VStack 
                spacing={6} 
                align="stretch" 
                flex={1}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <Heading size="md" mb={2}>Informações Básicas</Heading>
                
                <FormControl isRequired>
                  <FormLabel>Título da Avaliação</FormLabel>
                  <Input 
                    name="title" 
                    value={assessmentInfo.title} 
                    onChange={handleInfoChange} 
                    placeholder="Ex: Avaliação Bimestral de Matemática"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Disciplina</FormLabel>
                  <Select 
                    name="subject" 
                    value={assessmentInfo.subject} 
                    onChange={handleInfoChange} 
                    placeholder="Selecione a disciplina"
                  >
                    {subjects.map((subject, idx) => (
                      <option key={idx} value={subject}>{subject}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Nível de Ensino</FormLabel>
                  <Select 
                    name="gradeLevel" 
                    value={assessmentInfo.gradeLevel} 
                    onChange={handleInfoChange} 
                    placeholder="Selecione o nível"
                  >
                    {gradeLevels.map((level, idx) => (
                      <option key={idx} value={level}>{level}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tipo de Avaliação</FormLabel>
                  <Select 
                    name="assessmentType" 
                    value={assessmentInfo.assessmentType} 
                    onChange={handleInfoChange} 
                    placeholder="Selecione o tipo"
                  >
                    {assessmentTypes.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Duração (minutos)</FormLabel>
                  <NumberInput
                    min={5}
                    max={240}
                    value={assessmentInfo.duration}
                    onChange={(value) => handleInfoChange({target: {name: 'duration', value}})}
                  >
                    <NumberInputField name="duration" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </VStack>

              <VStack 
                spacing={6} 
                align="stretch" 
                flex={1}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <Heading size="md" mb={2}>Opções Avançadas</Heading>
                
                <FormControl>
                  <FormLabel>Instruções Gerais</FormLabel>
                  <Textarea 
                    name="instructions" 
                    value={assessmentInfo.instructions} 
                    onChange={handleInfoChange}
                    placeholder="Instruções gerais para a avaliação"
                    rows={4}
                  />
                </FormControl>
                
                <Box>
                  <Text fontWeight="medium" mb={2}>Distribuição por Nível de Dificuldade</Text>
                  <Stack spacing={4}>
                    <Flex align="center">
                      <Text w="80px" fontSize="sm">Fácil:</Text>
                      <Slider 
                        flex="1"
                        colorScheme="green"
                        defaultValue={difficultyDistribution.easy}
                        min={0}
                        max={100}
                        onChange={(val) => setDifficultyDistribution(prev => ({...prev, easy: val}))}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text w="50px" textAlign="right">{difficultyDistribution.easy}%</Text>
                    </Flex>
                    
                    <Flex align="center">
                      <Text w="80px" fontSize="sm">Médio:</Text>
                      <Slider 
                        flex="1"
                        colorScheme="yellow"
                        defaultValue={difficultyDistribution.medium}
                        min={0}
                        max={100}
                        onChange={(val) => setDifficultyDistribution(prev => ({...prev, medium: val}))}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text w="50px" textAlign="right">{difficultyDistribution.medium}%</Text>
                    </Flex>
                    
                    <Flex align="center">
                      <Text w="80px" fontSize="sm">Difícil:</Text>
                      <Slider 
                        flex="1"
                        colorScheme="red"
                        defaultValue={difficultyDistribution.hard}
                        min={0}
                        max={100}
                        onChange={(val) => setDifficultyDistribution(prev => ({...prev, hard: val}))}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text w="50px" textAlign="right">{difficultyDistribution.hard}%</Text>
                    </Flex>
                  </Stack>
                </Box>
                
                <Box>
                  <Text fontWeight="medium" mb={3}>Elementos da Avaliação</Text>
                  <HStack spacing={8}>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="includeHeader" mb="0">
                        Cabeçalho
                      </FormLabel>
                      <Switch 
                        id="includeHeader"
                        name="includeHeader"
                        colorScheme="brand"
                        isChecked={assessmentInfo.includeHeader}
                        onChange={handleSwitchChange}
                      />
                    </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="includeFooter" mb="0">
                        Rodapé
                      </FormLabel>
                      <Switch 
                        id="includeFooter"
                        name="includeFooter"
                        colorScheme="brand"
                        isChecked={assessmentInfo.includeFooter}
                        onChange={handleSwitchChange}
                      />
                    </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="includeAnswerKey" mb="0">
                        Gabarito
                      </FormLabel>
                      <Switch 
                        id="includeAnswerKey"
                        name="includeAnswerKey"
                        colorScheme="brand"
                        isChecked={assessmentInfo.includeAnswerKey}
                        onChange={handleSwitchChange}
                      />
                    </FormControl>
                  </HStack>
                </Box>
                
                <Button 
                  colorScheme="brand" 
                  size="lg" 
                  onClick={handleGenerateAssessment} 
                  isLoading={isGenerating}
                  loadingText="Gerando..."
                  leftIcon={<Icon as={FaRandom} />}
                  w="full"
                  mt={4}
                >
                  Gerar Avaliação
                </Button>
              </VStack>
            </Flex>
          </TabPanel>

          {/* Aba de Estrutura e Questões */}
          <TabPanel px={0} pt={6}>
            <Flex 
              direction={{ base: 'column', lg: 'row' }} 
              gap={6}
            >
              <Box 
                flex={3}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md">Seções da Avaliação</Heading>
                  <HStack>
                    <Button
                      leftIcon={<Icon as={FaPlus} />}
                      colorScheme="brand"
                      size="sm"
                      onClick={addSection}
                    >
                      Nova Seção
                    </Button>
                    <Button
                      leftIcon={<Icon as={FaFileImport} />}
                      variant="outline"
                      colorScheme="brand"
                      size="sm"
                    >
                      Importar Exercícios
                    </Button>
                  </HStack>
                </Flex>

                {sections.length > 0 ? (
                  <Accordion allowMultiple defaultIndex={[0]}>
                    {sections.map((section, sectionIndex) => (
                      <AccordionItem key={section.id}>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            <Text fontWeight="bold">
                              Seção {sectionIndex + 1}: {section.title}
                            </Text>
                          </Box>
                          <Badge colorScheme="blue" mr={2}>
                            {section.exercises.length} questões
                          </Badge>
                          <Badge colorScheme="green">
                            {section.points} pontos
                          </Badge>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          {/* Formulário para editar a seção */}
                          <VStack align="stretch" spacing={4} mb={4}>
                            <FormControl>
                              <FormLabel>Título da Seção</FormLabel>
                              <Input 
                                value={section.title}
                                onChange={e => handleSectionChange(section.id, 'title', e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Instruções</FormLabel>
                              <Textarea 
                                value={section.instructions}
                                onChange={e => handleSectionChange(section.id, 'instructions', e.target.value)}
                              />
                            </FormControl>
                            <HStack>
                              <Button
                                leftIcon={<Icon as={FaPlus} />}
                                colorScheme="blue"
                                size="sm"
                                onClick={() => {
                                  // Lógica para adicionar exercício à seção
                                  // Aqui você abriria modal ou adicionaria um exercício padrão
                                  const newExercise = {
                                    id: Date.now(),
                                    question: 'Nova questão',
                                    options: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
                                    correctAnswer: 0,
                                    points: 1,
                                    difficulty: 'medium',
                                    type: 'multiple-choice'
                                  };
                                  
                                  addExerciseToSection(section.id, newExercise);
                                }}
                              >
                                Adicionar Questão
                              </Button>
                              <Button
                                leftIcon={<Icon as={FaTrash} />}
                                colorScheme="red"
                                size="sm"
                                variant="outline"
                                onClick={() => removeSection(section.id)}
                              >
                                Remover Seção
                              </Button>
                            </HStack>
                            
                            {/* Lista de exercícios da seção */}
                            {section.exercises.length > 0 && (
                              <Box mt={4}>
                                <Heading size="sm" mb={2}>Questões</Heading>
                                <Table size="sm" variant="simple">
                                  <Thead>
                                    <Tr>
                                      <Th width="60%">Questão</Th>
                                      <Th>Tipo</Th>
                                      <Th>Pontos</Th>
                                      <Th>Ações</Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    {section.exercises.map((exercise, idx) => (
                                      <Tr key={exercise.id}>
                                        <Td>
                                          <Text noOfLines={1}>
                                            {exercise.question}
                                          </Text>
                                        </Td>
                                        <Td>
                                          <Badge colorScheme={
                                            exercise.type === 'multiple-choice' ? 'blue' : 
                                            exercise.type === 'essay' ? 'purple' : 
                                            'green'
                                          }>
                                            {exercise.type === 'multiple-choice' ? 'Múltipla Escolha' : 
                                             exercise.type === 'essay' ? 'Dissertativa' : 
                                             'Cálculo'}
                                          </Badge>
                                        </Td>
                                        <Td>
                                          <Text fontWeight="medium">{exercise.points}</Text>
                                        </Td>
                                        <Td>
                                          <HStack spacing={1}>
                                            <IconButton
                                              icon={<FaEye />}
                                              size="xs"
                                              variant="ghost"
                                              colorScheme="blue"
                                              onClick={() => handlePreviewExercise(exercise)}
                                            />
                                            <IconButton
                                              icon={<FaEdit />}
                                              size="xs"
                                              variant="ghost"
                                              colorScheme="green"
                                              onClick={() => {
                                                // Lógica para editar exercício
                                              }}
                                            />
                                            <IconButton
                                              icon={<FaTrash />}
                                              size="xs"
                                              variant="ghost"
                                              colorScheme="red"
                                              onClick={() => removeExerciseFromSection(section.id, exercise.id)}
                                            />
                                          </HStack>
                                        </Td>
                                      </Tr>
                                    ))}
                                  </Tbody>
                                </Table>
                              </Box>
                            )}
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <Box
                    border="2px dashed"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={8}
                    textAlign="center"
                  >
                    <Text color="gray.500" mb={4}>
                      Nenhuma seção criada. Adicione uma seção para começar.
                    </Text>
                    <Button
                      leftIcon={<Icon as={FaPlus} />}
                      colorScheme="brand"
                      onClick={addSection}
                    >
                      Adicionar Seção
                    </Button>
                  </Box>
                )}
              </Box>

              <Box 
                flex={1}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
                height="fit-content"
              >
                <Heading size="md" mb={4}>Resumo da Avaliação</Heading>

                <VStack align="stretch" spacing={4} divider={<Divider />}>
                  <Box>
                    <Text color="gray.600" fontSize="sm">Título</Text>
                    <Text fontWeight="bold">
                      {assessmentInfo.title || 'Sem título'}
                    </Text>
                  </Box>

                  <Box>
                    <Text color="gray.600" fontSize="sm">Disciplina</Text>
                    <Text fontWeight="bold">
                      {assessmentInfo.subject || 'Não definido'}
                    </Text>
                  </Box>

                  <Box>
                    <Text color="gray.600" fontSize="sm">Nível</Text>
                    <Text fontWeight="bold">
                      {assessmentInfo.gradeLevel || 'Não definido'}
                    </Text>
                  </Box>

                  <Box>
                    <Text color="gray.600" fontSize="sm">Duração</Text>
                    <Text fontWeight="bold">
                      {assessmentInfo.duration} minutos
                    </Text>
                  </Box>

                  <Box>
                    <Text color="gray.600" fontSize="sm">Total de Pontos</Text>
                    <Text fontWeight="bold" fontSize="xl" color="brand.600">
                      {calculateTotalPoints()}
                    </Text>
                  </Box>

                  <Box>
                    <Text color="gray.600" fontSize="sm" mb={1}>Distribuição de Dificuldade</Text>
                    {difficulty.total > 0 ? (
                      <Box>
                        <Flex justify="space-between" align="center">
                          <Text fontSize="xs">Fácil</Text>
                          <Text fontSize="xs" fontWeight="bold">
                            {Math.round((difficulty.easy / difficulty.total) * 100) || 0}%
                          </Text>
                        </Flex>
                        <Progress 
                          value={(difficulty.easy / difficulty.total) * 100 || 0} 
                          size="xs" 
                          colorScheme="green" 
                          mb={1} 
                        />
                        
                        <Flex justify="space-between" align="center">
                          <Text fontSize="xs">Médio</Text>
                          <Text fontSize="xs" fontWeight="bold">
                            {Math.round((difficulty.medium / difficulty.total) * 100) || 0}%
                          </Text>
                        </Flex>
                        <Progress 
                          value={(difficulty.medium / difficulty.total) * 100 || 0} 
                          size="xs" 
                          colorScheme="yellow" 
                          mb={1} 
                        />
                        
                        <Flex justify="space-between" align="center">
                          <Text fontSize="xs">Difícil</Text>
                          <Text fontSize="xs" fontWeight="bold">
                            {Math.round((difficulty.hard / difficulty.total) * 100) || 0}%
                          </Text>
                        </Flex>
                        <Progress 
                          value={(difficulty.hard / difficulty.total) * 100 || 0} 
                          size="xs" 
                          colorScheme="red" 
                        />
                      </Box>
                    ) : (
                      <Text fontSize="sm" color="gray.500">
                        Nenhuma questão adicionada
                      </Text>
                    )}
                  </Box>
                </VStack>
              </Box>
            </Flex>
          </TabPanel>

          {/* Aba de Visualização e Exportação */}
          <TabPanel px={0} pt={6}>
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              gap={6}
            >
              <Box
                flex={2}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <Heading size="md" mb={6}>Visualização da Avaliação</Heading>

                {sections.length > 0 ? (
                  <Box
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={6}
                    maxHeight="600px"
                    overflowY="auto"
                  >
                    {/* Cabeçalho */}
                    {assessmentInfo.includeHeader && (
                      <Box mb={6} p={4} borderWidth="1px" borderRadius="md">
                        <Heading size="md" textAlign="center" mb={2}>
                          {assessmentInfo.title || 'Título da Avaliação'}
                        </Heading>
                        
                        <Flex justify="space-between" fontSize="sm" mb={4}>
                          <Box>
                            <Text><strong>Disciplina:</strong> {assessmentInfo.subject}</Text>
                            <Text><strong>Série:</strong> {assessmentInfo.gradeLevel}</Text>
                          </Box>
                          <Box>
                            <Text><strong>Data:</strong> ___/___/____</Text>
                            <Text><strong>Valor:</strong> {calculateTotalPoints()} pontos</Text>
                          </Box>
                        </Flex>
                        
                        <Divider my={2} />
                        
                        <Flex justify="space-between" fontSize="sm">
                          <Text><strong>Nome:</strong> ________________________________________</Text>
                          <Text><strong>Nº:</strong> _______</Text>
                        </Flex>
                      </Box>
                    )}

                    {/* Instruções */}
                    {assessmentInfo.instructions && (
                      <Box mb={6}>
                        <Heading size="sm" mb={2}>Instruções:</Heading>
                        <Text fontSize="sm" whiteSpace="pre-wrap">
                          {assessmentInfo.instructions}
                        </Text>
                      </Box>
                    )}

                    {/* Seções */}
                    {sections.map((section, sectionIndex) => (
                      <Box key={section.id} mb={6}>
                        <Heading size="sm" mb={2}>
                          {section.title}
                        </Heading>
                        
                        {section.instructions && (
                          <Text fontSize="sm" mb={4} fontStyle="italic">
                            {section.instructions}
                          </Text>
                        )}
                        
                        {section.exercises.map((exercise, exerciseIndex) => (
                          <Box 
                            key={exercise.id} 
                            mb={4}
                            p={3}
                            borderWidth="1px"
                            borderColor="gray.100"
                            borderRadius="md"
                            bg="gray.50"
                          >
                            <Flex justify="space-between" align="start" mb={2}>
                              <Text fontWeight="bold">
                                {sectionIndex + 1}.{exerciseIndex + 1}) {exercise.question}
                              </Text>
                              <Badge ml={2}>
                                {exercise.points} {exercise.points === 1 ? 'ponto' : 'pontos'}
                              </Badge>
                            </Flex>
                            
                            {exercise.type === 'multiple-choice' && (
                              <Box pl={4}>
                                {exercise.options.map((option, optionIndex) => (
                                  <Flex key={optionIndex} mb={1} align="center">
                                    <Box 
                                      border="1px" 
                                      borderColor="gray.300" 
                                      size="16px" 
                                      borderRadius="full" 
                                      mr={2}
                                      w="16px"
                                      h="16px"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      fontSize="10px"
                                      fontWeight="bold"
                                      bg={assessmentInfo.includeAnswerKey && exercise.correctAnswer === optionIndex ? 'green.100' : 'white'}
                                    >
                                      {String.fromCharCode(65 + optionIndex)}
                                    </Box>
                                    <Text fontSize="sm">{option}</Text>
                                    {assessmentInfo.includeAnswerKey && exercise.correctAnswer === optionIndex && (
                                      <Icon as={FaCheck} color="green.500" ml={1} />
                                    )}
                                  </Flex>
                                ))}
                              </Box>
                            )}
                            
                            {exercise.type === 'essay' && (
                              <Box mt={2}>
                                <Box 
                                  borderWidth="1px" 
                                  borderColor="gray.300" 
                                  borderStyle="dashed" 
                                  height="100px" 
                                  borderRadius="md"
                                />
                                
                                {assessmentInfo.includeAnswerKey && exercise.expectedAnswer && (
                                  <Box mt={2} p={2} bg="green.50" borderRadius="md">
                                    <Text fontSize="xs" fontWeight="bold">Resposta esperada:</Text>
                                    <Text fontSize="sm">{exercise.expectedAnswer}</Text>
                                  </Box>
                                )}
                              </Box>
                            )}
                            
                            {exercise.type === 'calculation' && (
                              <Box mt={2}>
                                <Box 
                                  borderWidth="1px" 
                                  borderColor="gray.300" 
                                  borderStyle="dashed" 
                                  height="100px" 
                                  borderRadius="md"
                                />
                                
                                {assessmentInfo.includeAnswerKey && exercise.expectedAnswer && (
                                  <Box mt={2} p={2} bg="green.50" borderRadius="md">
                                    <Text fontSize="xs" fontWeight="bold">Resposta esperada:</Text>
                                    <Text fontSize="sm">{exercise.expectedAnswer}</Text>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                    ))}

                    {/* Rodapé */}
                    {assessmentInfo.includeFooter && (
                      <Box mt={8} pt={4} borderTop="1px" borderColor="gray.200">
                        <Text fontSize="sm" textAlign="center" color="gray.600">
                          Boa avaliação!
                        </Text>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    border="2px dashed"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={8}
                    textAlign="center"
                  >
                    <Text color="gray.500" mb={4}>
                      Nenhuma seção criada ainda. Adicione seções e exercícios para visualizar a avaliação.
                    </Text>
                  </Box>
                )}
              </Box>

              <VStack
                flex={1}
                spacing={6}
                align="stretch"
              >
                <Box
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <Heading size="md" mb={4}>Salvar Avaliação</Heading>

                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Versão da avaliação</FormLabel>
                      <Radio defaultChecked>Versão única</Radio>
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="includeAnswerKeyExport" mb="0" flex="1">
                        Incluir Gabarito
                      </FormLabel>
                      <Switch 
                        id="includeAnswerKeyExport"
                        name="includeAnswerKey"
                        isChecked={assessmentInfo.includeAnswerKey}
                        onChange={handleSwitchChange}
                        colorScheme="brand"
                      />
                    </FormControl>

                    <Button
                      leftIcon={<Icon as={FaSave} />}
                      colorScheme="brand"
                      w="full"
                      onClick={handleSaveAssessment}
                    >
                      Salvar na Biblioteca
                    </Button>
                  </VStack>
                </Box>

                <Box
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <Heading size="md" mb={4}>Exportar Avaliação</Heading>

                  <VStack spacing={4} align="stretch">
                    <Button
                      leftIcon={<Icon as={FaFileExport} />}
                      variant="outline"
                      colorScheme="brand"
                      w="full"
                      onClick={() => handleExport('pdf')}
                    >
                      Exportar como PDF
                    </Button>

                    <Button
                      leftIcon={<Icon as={FaFileExport} />}
                      variant="outline"
                      colorScheme="brand"
                      w="full"
                      onClick={() => handleExport('docx')}
                    >
                      Exportar como DOCX
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal para visualização de exercício */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Visualização da Questão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {previewExercise && (
              <Box>
                <Text fontWeight="bold" mb={3}>
                  {previewExercise.question}
                </Text>

                {previewExercise.type === 'multiple-choice' && (
                  <Box mt={4}>
                    {previewExercise.options.map((option, optionIndex) => (
                      <Flex key={optionIndex} mb={2} align="center">
                        <Box 
                          border="1px" 
                          borderColor="gray.300" 
                          size="20px" 
                          borderRadius="full" 
                          mr={2}
                          w="20px"
                          h="20px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="bold"
                          bg={previewExercise.correctAnswer === optionIndex ? 'green.100' : 'white'}
                        >
                          {String.fromCharCode(65 + optionIndex)}
                        </Box>
                        <Text>{option}</Text>
                        {previewExercise.correctAnswer === optionIndex && (
                          <Icon as={FaCheck} color="green.500" ml={2} />
                        )}
                      </Flex>
                    ))}
                  </Box>
                )}

                {(previewExercise.type === 'essay' || previewExercise.type === 'calculation') && (
                  <Box mt={4}>
                    <Text fontWeight="bold" mb={2}>Resposta Esperada:</Text>
                    <Text p={2} bg="gray.50" borderRadius="md">
                      {previewExercise.expectedAnswer}
                    </Text>
                  </Box>
                )}

                <Flex mt={4} justify="space-between">
                  <Badge>
                    {previewExercise.points} {previewExercise.points === 1 ? 'ponto' : 'pontos'}
                  </Badge>
                  <Badge colorScheme={
                    previewExercise.difficulty === 'easy' ? 'green' :
                    previewExercise.difficulty === 'medium' ? 'yellow' : 'red'
                  }>
                    {previewExercise.difficulty === 'easy' ? 'Fácil' :
                     previewExercise.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                  </Badge>
                </Flex>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant="ghost">Editar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AssessmentCreator;