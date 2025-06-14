import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  HStack,
  Flex,
  useToast,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
  Badge,
  Switch,
  Radio,
  RadioGroup,
  Checkbox,
  Card,
  CardBody,
  Divider,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import { 
  FaPlus, 
  FaSave, 
  FaFileExport, 
  FaEye, 
  FaRandom, 
  FaEdit,
  FaTrash,
  FaChevronRight,
  FaCheck
} from 'react-icons/fa';

const ExerciseBuilder = () => {
  const toast = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExercises, setGeneratedExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [previewExercise, setPreviewExercise] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [formData, setFormData] = useState({
    discipline: '',
    topic: '',
    gradeLevel: '',
    exerciseType: '',
    quantity: 5,
    difficultyLevel: 'medium',
    includeAnswers: true,
    instructionsText: '',
    specificContent: ''
  });

  // Tipos de exercícios disponíveis por disciplina
  const exerciseTypesByDiscipline = {
    'Língua Portuguesa': [
      'Interpretação de Texto',
      'Gramática',
      'Produção Textual',
      'Ortografia',
      'Análise Sintática'
    ],
    'Matemática': [
      'Problemas',
      'Cálculos',
      'Geometria',
      'Álgebra',
      'Raciocínio Lógico'
    ],
    'Ciências': [
      'Questões Conceituais',
      'Experimentos',
      'Relação de Conceitos',
      'Identificação',
      'Verdadeiro ou Falso'
    ],
    'História': [
      'Análise de Fontes Históricas',
      'Cronologia',
      'Relação Causa-Efeito',
      'Contextualização',
      'Questões Dissertativas'
    ],
    'Geografia': [
      'Análise de Mapas',
      'Conceitos Geográficos',
      'Atualidades',
      'Meio Ambiente',
      'Globalização'
    ]
  };
  
  // Exemplo de exercícios
  const sampleExercises = {
    'Língua Portuguesa': {
      'Interpretação de Texto': [
        {
          id: 1,
          question: 'Leia o texto a seguir:\n\n"A água é um recurso natural indispensável para a vida. No entanto, seu uso indiscriminado pode levar à escassez."\n\nQual é a ideia central do texto?',
          options: [
            'A água é um recurso natural dispensável.',
            'A água é importante, mas seu uso não afeta sua disponibilidade.',
            'A água é essencial e seu uso inadequado pode causar escassez.',
            'O uso da água não está relacionado com sua abundância.'
          ],
          correctAnswer: 2,
          type: 'multiple-choice'
        },
        {
          id: 2,
          question: 'Identifique no texto a palavra que indica oposição de ideias:',
          correctAnswer: 'No entanto',
          type: 'short-answer'
        }
      ],
      'Gramática': [
        {
          id: 3,
          question: 'Identifique a alternativa em que todas as palavras estão corretamente acentuadas:',
          options: [
            'Saúde, gratuíto, heróico',
            'Juíz, raíz, saída',
            'Lâmpada, médico, físico',
            'Cárie, bênção, táxi'
          ],
          correctAnswer: 3,
          type: 'multiple-choice'
        }
      ]
    },
    'Matemática': {
      'Problemas': [
        {
          id: 4,
          question: 'Maria comprou 3 cadernos por R$ 12,50 cada e 2 lápis por R$ 2,75 cada. Quanto ela gastou ao todo?',
          correctAnswer: 'R$ 43,00',
          type: 'calculation'
        }
      ],
      'Geometria': [
        {
          id: 5,
          question: 'Calcule a área de um retângulo com 7 cm de largura e 12 cm de comprimento.',
          correctAnswer: '84 cm²',
          type: 'calculation'
        }
      ]
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNumberInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleGenerateExercises = () => {
    // Validar campos obrigatórios
    if (!formData.discipline || !formData.topic || !formData.gradeLevel || !formData.exerciseType) {
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

    // Simular chamada para API de IA
    setTimeout(() => {
      // Gerar exercícios aleatórios com base na disciplina e tipo
      let generatedList = [];
      const discipline = formData.discipline;
      const exerciseType = formData.exerciseType;
      
      // Verificar se há exemplos disponíveis para a disciplina e tipo
      if (
        sampleExercises[discipline] && 
        sampleExercises[discipline][exerciseType]
      ) {
        // Usar os exemplos disponíveis
        generatedList = [...sampleExercises[discipline][exerciseType]];
        
        // Adicionar exercícios genéricos se necessário
        while (generatedList.length < formData.quantity) {
          generatedList.push({
            id: generatedList.length + 100,
            question: `Questão sobre ${formData.topic} (${formData.discipline} - ${formData.exerciseType})`,
            options: [
              'Alternativa A',
              'Alternativa B',
              'Alternativa C',
              'Alternativa D'
            ],
            correctAnswer: Math.floor(Math.random() * 4),
            type: 'multiple-choice'
          });
        }
      } else {
        // Criar exercícios genéricos baseados no tópico
        for (let i = 0; i < formData.quantity; i++) {
          generatedList.push({
            id: i + 1,
            question: `Questão ${i+1} sobre ${formData.topic} (${formData.discipline} - ${formData.exerciseType})`,
            options: [
              'Alternativa A',
              'Alternativa B',
              'Alternativa C',
              'Alternativa D'
            ],
            correctAnswer: Math.floor(Math.random() * 4),
            type: 'multiple-choice'
          });
        }
      }
      
      setGeneratedExercises(generatedList);
      setSelectedExercises(generatedList); // Selecionar todos por padrão
      setIsGenerating(false);

      toast({
        title: 'Exercícios gerados com sucesso!',
        description: `Foram gerados ${generatedList.length} exercícios.`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    }, 2000);
  };

  const handleSelectExercise = (exercise) => {
    if (selectedExercises.some(item => item.id === exercise.id)) {
      setSelectedExercises(selectedExercises.filter(item => item.id !== exercise.id));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleSelectAllExercises = () => {
    if (selectedExercises.length === generatedExercises.length) {
      setSelectedExercises([]);
    } else {
      setSelectedExercises([...generatedExercises]);
    }
  };

  const handlePreviewExercise = (exercise) => {
    setPreviewExercise(exercise);
    onOpen();
  };

  const handleSaveExercises = () => {
    if (selectedExercises.length === 0) {
      toast({
        title: 'Nenhum exercício selecionado',
        description: 'Por favor, selecione pelo menos um exercício para salvar.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    toast({
      title: 'Exercícios salvos!',
      description: `${selectedExercises.length} exercícios foram salvos em sua biblioteca.`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  const handleExport = (format) => {
    if (selectedExercises.length === 0) {
      toast({
        title: 'Nenhum exercício selecionado',
        description: 'Por favor, selecione pelo menos um exercício para exportar.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    toast({
      title: `Exportando como ${format.toUpperCase()}`,
      description: `${selectedExercises.length} exercícios serão exportados.`,
      status: 'info',
      duration: 3000,
      isClosable: true
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={2}>Criador de Exercícios</Heading>
      <Text color="gray.600" mb={8}>
        Gere exercícios personalizados com IA para suas aulas
      </Text>

      <Tabs colorScheme="brand" variant="enclosed">
        <TabList>
          <Tab>Criar Exercícios</Tab>
          <Tab>Revisão e Seleção</Tab>
          <Tab>Salvar e Exportar</Tab>
        </TabList>

        <TabPanels>
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
                  <FormLabel>Disciplina</FormLabel>
                  <Select 
                    name="discipline" 
                    value={formData.discipline} 
                    onChange={handleInputChange} 
                    placeholder="Selecione a disciplina"
                  >
                    <option value="Língua Portuguesa">Língua Portuguesa</option>
                    <option value="Matemática">Matemática</option>
                    <option value="Ciências">Ciências</option>
                    <option value="História">História</option>
                    <option value="Geografia">Geografia</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tópico/Tema</FormLabel>
                  <Input 
                    name="topic" 
                    value={formData.topic} 
                    onChange={handleInputChange} 
                    placeholder="Ex: Verbos no Presente do Indicativo"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Nível de Ensino</FormLabel>
                  <Select 
                    name="gradeLevel" 
                    value={formData.gradeLevel} 
                    onChange={handleInputChange} 
                    placeholder="Selecione o nível"
                  >
                    <option value="1º ano - Ensino Fundamental">1º ano - Ensino Fundamental</option>
                    <option value="2º ano - Ensino Fundamental">2º ano - Ensino Fundamental</option>
                    <option value="3º ano - Ensino Fundamental">3º ano - Ensino Fundamental</option>
                    <option value="4º ano - Ensino Fundamental">4º ano - Ensino Fundamental</option>
                    <option value="5º ano - Ensino Fundamental">5º ano - Ensino Fundamental</option>
                    <option value="6º ano - Ensino Fundamental">6º ano - Ensino Fundamental</option>
                    <option value="7º ano - Ensino Fundamental">7º ano - Ensino Fundamental</option>
                    <option value="8º ano - Ensino Fundamental">8º ano - Ensino Fundamental</option>
                    <option value="9º ano - Ensino Fundamental">9º ano - Ensino Fundamental</option>
                    <option value="1º ano - Ensino Médio">1º ano - Ensino Médio</option>
                    <option value="2º ano - Ensino Médio">2º ano - Ensino Médio</option>
                    <option value="3º ano - Ensino Médio">3º ano - Ensino Médio</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tipo de Exercício</FormLabel>
                  <Select 
                    name="exerciseType" 
                    value={formData.exerciseType} 
                    onChange={handleInputChange} 
                    placeholder="Selecione o tipo"
                    isDisabled={!formData.discipline}
                  >
                    {formData.discipline && 
                      exerciseTypesByDiscipline[formData.discipline]?.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))
                    }
                  </Select>
                  {!formData.discipline && 
                    <Text fontSize="sm" color="red.500" mt={1}>
                      Selecione uma disciplina primeiro
                    </Text>
                  }
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
                <Heading size="md" mb={2}>Configurações</Heading>
                
                <FormControl>
                  <FormLabel>Quantidade de Exercícios</FormLabel>
                  <NumberInput 
                    min={1} 
                    max={20} 
                    value={formData.quantity}
                    onChange={(value) => handleNumberInputChange('quantity', value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Nível de Dificuldade</FormLabel>
                  <RadioGroup 
                    value={formData.difficultyLevel}
                    onChange={(value) => handleNumberInputChange('difficultyLevel', value)}
                  >
                    <Stack direction="row" spacing={5}>
                      <Radio value="easy">Fácil</Radio>
                      <Radio value="medium">Médio</Radio>
                      <Radio value="hard">Difícil</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <Flex justify="space-between">
                    <FormLabel htmlFor="includeAnswers" mb={0}>
                      Incluir Respostas
                    </FormLabel>
                    <Switch 
                      id="includeAnswers"
                      name="includeAnswers"
                      colorScheme="brand"
                      isChecked={formData.includeAnswers}
                      onChange={handleSwitchChange}
                    />
                  </Flex>
                </FormControl>

                <FormControl>
                  <FormLabel>Instruções (opcional)</FormLabel>
                  <Textarea 
                    name="instructionsText" 
                    value={formData.instructionsText} 
                    onChange={handleInputChange}
                    placeholder="Instruções para os alunos"
                    rows={2}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Conteúdo Específico (opcional)</FormLabel>
                  <Textarea 
                    name="specificContent" 
                    value={formData.specificContent} 
                    onChange={handleInputChange}
                    placeholder="Detalhes específicos sobre o conteúdo a ser abordado"
                    rows={3}
                  />
                </FormControl>

                <Button 
                  colorScheme="brand" 
                  size="lg" 
                  onClick={handleGenerateExercises} 
                  isLoading={isGenerating}
                  loadingText="Gerando..."
                  leftIcon={<Icon as={FaRandom} />}
                  w="full"
                  mt={3}
                >
                  Gerar Exercícios
                </Button>
              </VStack>
            </Flex>
          </TabPanel>

          <TabPanel px={0} pt={6}>
            <Box 
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">
                  Exercícios Gerados ({generatedExercises.length})
                </Heading>
                <HStack spacing={2}>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={handleSelectAllExercises}
                  >
                    {selectedExercises.length === generatedExercises.length 
                      ? 'Desmarcar Todos' 
                      : 'Selecionar Todos'
                    }
                  </Button>
                  <Badge colorScheme="green" p={2}>
                    {selectedExercises.length} selecionados
                  </Badge>
                </HStack>
              </Flex>

              {generatedExercises.length > 0 ? (
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th width="50px">Sel.</Th>
                      <Th width="60px">Nº</Th>
                      <Th>Questão</Th>
                      <Th width="100px">Tipo</Th>
                      <Th width="120px">Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {generatedExercises.map((exercise, index) => (
                      <Tr key={exercise.id} bg={index % 2 === 0 ? 'gray.50' : 'white'}>
                        <Td>
                          <Checkbox 
                            isChecked={selectedExercises.some(item => item.id === exercise.id)}
                            onChange={() => handleSelectExercise(exercise)}
                            colorScheme="brand"
                          />
                        </Td>
                        <Td>{index + 1}</Td>
                        <Td>
                          {exercise.question.length > 60 
                            ? `${exercise.question.substring(0, 60)}...` 
                            : exercise.question
                          }
                        </Td>
                        <Td>
                          <Badge colorScheme={
                            exercise.type === 'multiple-choice' ? 'blue' : 
                            exercise.type === 'short-answer' ? 'green' :
                            exercise.type === 'calculation' ? 'purple' : 'gray'
                          }>
                            {exercise.type === 'multiple-choice' ? 'Múltipla Escolha' : 
                             exercise.type === 'short-answer' ? 'Resposta Curta' :
                             exercise.type === 'calculation' ? 'Cálculo' : 'Outro'}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button 
                              size="xs" 
                              colorScheme="blue"
                              onClick={() => handlePreviewExercise(exercise)}
                            >
                              <Icon as={FaEye} />
                            </Button>
                            <Button size="xs" colorScheme="green">
                              <Icon as={FaEdit} />
                            </Button>
                            <Button size="xs" colorScheme="red">
                              <Icon as={FaTrash} />
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Box 
                  border="1px dashed"
                  borderColor="gray.300"
                  p={8}
                  borderRadius="md"
                  textAlign="center"
                >
                  <Text color="gray.500">
                    Nenhum exercício gerado. Use a aba "Criar Exercícios" para gerar exercícios.
                  </Text>
                </Box>
              )}
            </Box>

            {/* Modal para visualização de exercício */}
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Visualização do Exercício</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {previewExercise && (
                    <Box>
                      <Text fontWeight="bold" mb={4}>
                        Questão:
                      </Text>
                      <Text whiteSpace="pre-wrap" mb={4}>
                        {previewExercise.question}
                      </Text>

                      {previewExercise.options && (
                        <Box mb={4}>
                          <Text fontWeight="bold" mb={2}>
                            Alternativas:
                          </Text>
                          {previewExercise.options.map((option, index) => (
                            <Flex key={index} alignItems="center" mb={2}>
                              <Box 
                                mr={3}
                                bg={formData.includeAnswers && previewExercise.correctAnswer === index ? "green.100" : "gray.100"}
                                borderRadius="md"
                                px={2}
                                py={1}
                                fontWeight={formData.includeAnswers && previewExercise.correctAnswer === index ? "bold" : "normal"}
                              >
                                {String.fromCharCode(65 + index)}
                              </Box>
                              <Text>
                                {option}
                              </Text>
                              {formData.includeAnswers && previewExercise.correctAnswer === index && (
                                <Icon as={FaCheck} color="green.500" ml={2} />
                              )}
                            </Flex>
                          ))}
                        </Box>
                      )}

                      {previewExercise.type !== 'multiple-choice' && formData.includeAnswers && (
                        <Box>
                          <Text fontWeight="bold" mb={2}>
                            Resposta:
                          </Text>
                          <Text p={2} bg="green.50" borderRadius="md">
                            {previewExercise.correctAnswer}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="brand" mr={3} onClick={onClose}>
                    Fechar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </TabPanel>

          <TabPanel px={0} pt={6}>
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
            >
              {generatedExercises.length > 0 ? (
                <VStack spacing={8} align="stretch">
                  <Box>
                    <Heading size="md" mb={4}>Salvar Lista de Exercícios</Heading>
                    <Card variant="outline">
                      <CardBody>
                        <Stack spacing={4}>
                          <FormControl>
                            <FormLabel>Nome da Lista</FormLabel>
                            <Input 
                              placeholder="Dê um nome para esta lista de exercícios" 
                              defaultValue={`Exercícios: ${formData.topic}`}
                            />
                          </FormControl>
                          
                          <FormControl>
                            <FormLabel>Categorias</FormLabel>
                            <Stack spacing={2} direction="row">
                              <Badge colorScheme="green" p={1}>{formData.discipline}</Badge>
                              <Badge colorScheme="purple" p={1}>{formData.gradeLevel}</Badge>
                              <Badge colorScheme="blue" p={1}>{formData.exerciseType}</Badge>
                            </Stack>
                          </FormControl>

                          <FormControl>
                            <FormLabel>Descrição (opcional)</FormLabel>
                            <Textarea 
                              placeholder="Descreva brevemente o objetivo desta lista de exercícios"
                            />
                          </FormControl>
                          
                          <HStack spacing={4}>
                            <Button 
                              leftIcon={<Icon as={FaSave} />}
                              colorScheme="brand" 
                              onClick={handleSaveExercises}
                              isDisabled={selectedExercises.length === 0}
                              flex={1}
                            >
                              Salvar na Biblioteca
                            </Button>
                            
                            <Button 
                              leftIcon={<Icon as={FaPlus} />}
                              variant="outline"
                              colorScheme="brand"
                              flex={1}
                            >
                              Adicionar à Avaliação
                            </Button>
                          </HStack>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Heading size="md" mb={4}>Exportar Lista</Heading>
                    <Card variant="outline">
                      <CardBody>
                        <Stack spacing={4}>
                          <FormControl>
                            <FormLabel>Opções de Exportação</FormLabel>
                            <Stack spacing={2}>
                              <Checkbox defaultChecked>Incluir enunciado/instruções</Checkbox>
                              <Checkbox defaultChecked isChecked={formData.includeAnswers}>
                                Incluir gabarito
                              </Checkbox>
                              <Checkbox defaultChecked>Adicionar cabeçalho com informações da escola</Checkbox>
                            </Stack>
                          </FormControl>
                          
                          <HStack spacing={4} mt={2}>
                            <Button 
                              leftIcon={<Icon as={FaFileExport} />}
                              variant="outline" 
                              onClick={() => handleExport('pdf')}
                              flex={1}
                              isDisabled={selectedExercises.length === 0}
                            >
                              Exportar como PDF
                            </Button>
                            <Button 
                              leftIcon={<Icon as={FaFileExport} />}
                              variant="outline"
                              onClick={() => handleExport('docx')}
                              flex={1}
                              isDisabled={selectedExercises.length === 0}
                            >
                              Exportar como DOCX
                            </Button>
                          </HStack>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Box>
                </VStack>
              ) : (
                <Box 
                  textAlign="center" 
                  p={8}
                  border="1px dashed"
                  borderColor="gray.300"
                  borderRadius="md"
                >
                  <Heading size="md" color="gray.500" mb={4}>
                    Nenhum exercício gerado
                  </Heading>
                  <Text>
                    Você precisa gerar exercícios antes de salvar ou exportar.
                  </Text>
                  <Button 
                    mt={4} 
                    colorScheme="brand"
                    onClick={() => document.querySelector('[role="tab"]').click()}
                  >
                    Ir para criação de exercícios
                  </Button>
                </Box>
              )}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ExerciseBuilder;