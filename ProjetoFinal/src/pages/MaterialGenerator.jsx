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
  Textarea,
  Button,
  VStack,
  HStack,
  Stack,
  Flex,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  Card,
  CardBody,
  Badge
} from '@chakra-ui/react';

const MaterialGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    discipline: '',
    topic: '',
    gradeLevel: '',
    contentType: '',
    keyPoints: '',
    complexity: 'medium',
    tone: 'educational',
    additionalNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGenerate = () => {
    // Validar campos obrigatórios
    if (!formData.discipline || !formData.topic || !formData.gradeLevel || !formData.contentType) {
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
      const sampleContent = `
# ${formData.topic}

## Introdução

Este material didático foi elaborado para estudantes do ${formData.gradeLevel}, focando no tema "${formData.topic}" da disciplina de ${formData.discipline}.

## Conteúdo Principal

A compreensão do tema "${formData.topic}" é fundamental para o desenvolvimento acadêmico dos alunos nesta fase. Os principais conceitos a serem explorados incluem:

1. Definições básicas e terminologia específica
2. Contexto histórico e relevância atual
3. Aplicações práticas e exemplos cotidianos
4. Metodologias de análise e interpretação

## Desenvolvimento

O ${formData.topic} pode ser abordado através de diversas perspectivas, considerando a faixa etária dos estudantes e seus conhecimentos prévios. É importante estabelecer conexões com outros conteúdos já estudados, facilitando a assimilação dos novos conceitos.

## Pontos-Chave para Discussão

${formData.keyPoints}

## Atividades Sugeridas

1. Discussão em grupo sobre os principais aspectos do tema
2. Exercícios práticos de aplicação dos conceitos
3. Projeto de pesquisa colaborativa
4. Avaliação formativa através de questionários

## Conclusão

Este material didático visa proporcionar uma compreensão abrangente do tema, estimulando o pensamento crítico e a aprendizagem significativa dos estudantes.
      `;

      setGeneratedContent(sampleContent);
      setIsGenerating(false);

      toast({
        title: 'Material gerado com sucesso!',
        description: 'O conteúdo foi gerado com base nos parâmetros fornecidos.',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    }, 2000);
  };

  const handleSave = () => {
    toast({
      title: 'Material salvo!',
      description: 'O material foi salvo em sua biblioteca.',
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

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={2}>Gerador de Material Didático</Heading>
      <Text color="gray.600" mb={8}>
        Crie textos e materiais didáticos personalizados com IA
      </Text>

      <Tabs colorScheme="brand" variant="enclosed">
        <TabList>
          <Tab>Geração de Conteúdo</Tab>
          <Tab>Visualização</Tab>
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
                    placeholder="Ex: Produção de texto narrativo"
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
                  <FormLabel>Tipo de Conteúdo</FormLabel>
                  <Select 
                    name="contentType" 
                    value={formData.contentType} 
                    onChange={handleInputChange} 
                    placeholder="Selecione o tipo"
                  >
                    <option value="Texto Didático">Texto Didático</option>
                    <option value="Resumo de Conteúdo">Resumo de Conteúdo</option>
                    <option value="Material de Apoio">Material de Apoio</option>
                    <option value="Plano de Aula">Plano de Aula</option>
                  </Select>
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
                <Heading size="md" mb={2}>Personalização</Heading>

                <FormControl>
                  <FormLabel>Pontos-Chave a Abordar</FormLabel>
                  <Textarea 
                    name="keyPoints" 
                    value={formData.keyPoints} 
                    onChange={handleInputChange}
                    placeholder="Liste os tópicos principais que devem ser abordados"
                    rows={4}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Nível de Complexidade</FormLabel>
                  <Select 
                    name="complexity" 
                    value={formData.complexity}
                    onChange={handleInputChange}
                  >
                    <option value="basic">Básico</option>
                    <option value="medium">Intermediário</option>
                    <option value="advanced">Avançado</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Tom/Estilo</FormLabel>
                  <Select 
                    name="tone" 
                    value={formData.tone}
                    onChange={handleInputChange}
                  >
                    <option value="educational">Educativo</option>
                    <option value="conversational">Conversacional</option>
                    <option value="formal">Formal</option>
                    <option value="narrative">Narrativo</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Observações Adicionais</FormLabel>
                  <Textarea 
                    name="additionalNotes" 
                    value={formData.additionalNotes} 
                    onChange={handleInputChange}
                    placeholder="Instruções específicas ou considerações especiais"
                    rows={3}
                  />
                </FormControl>

                <Button 
                  colorScheme="brand" 
                  size="lg" 
                  onClick={handleGenerate} 
                  isLoading={isGenerating}
                  loadingText="Gerando..."
                  w="full"
                  mt={3}
                >
                  Gerar Material
                </Button>
              </VStack>
            </Flex>
          </TabPanel>

          <TabPanel>
            <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
              <Flex justify="space-between" align="center" mb={4}>
                <Badge colorScheme="brand" p={2} fontSize="md">
                  {formData.discipline} - {formData.gradeLevel}
                </Badge>
                <Badge colorScheme="blue" p={2} fontSize="md">
                  {formData.contentType}
                </Badge>
              </Flex>
              
              {generatedContent ? (
                <Box 
                  border="1px" 
                  borderColor="gray.200" 
                  p={4} 
                  borderRadius="md"
                  fontFamily="serif"
                  whiteSpace="pre-wrap"
                  minH="500px"
                >
                  {generatedContent}
                </Box>
              ) : (
                <Box 
                  border="1px dashed" 
                  borderColor="gray.300" 
                  p={8} 
                  borderRadius="md"
                  textAlign="center"
                  color="gray.500"
                  minH="500px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="lg">
                    O conteúdo gerado aparecerá aqui. Use a aba "Geração de Conteúdo" para criar um material.
                  </Text>
                </Box>
              )}
            </Box>
          </TabPanel>

          <TabPanel>
            <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
              {generatedContent ? (
                <>
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <Heading size="md" mb={4}>Salvar Material</Heading>
                      <Card variant="outline">
                        <CardBody>
                          <Stack spacing={4}>
                            <FormControl>
                              <FormLabel>Nome do Material</FormLabel>
                              <Input 
                                placeholder="Dê um nome para este material" 
                                defaultValue={formData.topic}
                              />
                            </FormControl>
                            
                            <FormControl>
                              <FormLabel>Categorias</FormLabel>
                              <Stack spacing={2} direction="row">
                                <Badge colorScheme="green" p={1}>{formData.discipline}</Badge>
                                <Badge colorScheme="purple" p={1}>{formData.gradeLevel}</Badge>
                                <Badge colorScheme="blue" p={1}>{formData.contentType}</Badge>
                              </Stack>
                            </FormControl>

                            <Button 
                              colorScheme="brand" 
                              onClick={handleSave}
                            >
                              Salvar na Biblioteca
                            </Button>
                          </Stack>
                        </CardBody>
                      </Card>
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Heading size="md" mb={4}>Exportar Material</Heading>
                      <Card variant="outline">
                        <CardBody>
                          <Text mb={4}>
                            Exporte este material para usar em outras plataformas ou para impressão.
                          </Text>
                          <HStack spacing={4}>
                            <Button 
                              variant="outline" 
                              onClick={() => handleExport('pdf')}
                              flex={1}
                            >
                              Exportar como PDF
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleExport('docx')}
                              flex={1}
                            >
                              Exportar como DOCX
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleExport('txt')}
                              flex={1}
                            >
                              Exportar como TXT
                            </Button>
                          </HStack>
                        </CardBody>
                      </Card>
                    </Box>
                  </VStack>
                </>
              ) : (
                <Box 
                  textAlign="center" 
                  p={8}
                  border="1px dashed"
                  borderColor="gray.300"
                  borderRadius="md"
                >
                  <Heading size="md" color="gray.500" mb={4}>
                    Nenhum conteúdo gerado
                  </Heading>
                  <Text>
                    Você precisa gerar um material antes de salvar ou exportar.
                  </Text>
                  <Button 
                    mt={4} 
                    colorScheme="brand"
                    onClick={() => document.querySelector('[role="tab"]').click()}
                  >
                    Ir para geração de conteúdo
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

export default MaterialGenerator;