import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
  HStack,
  Card,
  CardBody,
  CardFooter,
  Divider,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import contentService from '../services/contentService';

const MaterialGenerator = () => {
  const [formData, setFormData] = useState({
    materia: '',
    nivel: '',
    topico: '',
  });
  
  const [generatedText, setGeneratedText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await contentService.generateSupportText(
        formData.materia,
        formData.nivel,
        formData.topico
      );
      
      setGeneratedText(result);
      toast({
        title: 'Material gerado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro ao gerar material:', error);
      toast({
        title: 'Erro ao gerar material',
        description: error.response?.data?.detail || 'Ocorreu um erro ao processar sua solicitação',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format) => {
    if (!generatedText) return;
    
    setIsExporting(true);
    try {
      await contentService.exportText(generatedText.id, format);
      toast({
        title: `Material exportado como ${format.toUpperCase()}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(`Erro ao exportar como ${format}:`, error);
      toast({
        title: 'Erro na exportação',
        description: error.response?.data?.detail || 'Não foi possível exportar o material',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Gerador de Material Didático
        </Heading>
        
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="materia" isRequired>
                  <FormLabel>Matéria</FormLabel>
                  <Select 
                    name="materia"
                    placeholder="Selecione a matéria"
                    value={formData.materia}
                    onChange={handleChange}
                  >
                    <option value="Matemática">Matemática</option>
                    <option value="Português">Português</option>
                    <option value="História">História</option>
                    <option value="Geografia">Geografia</option>
                    <option value="Ciências">Ciências</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Biologia">Biologia</option>
                  </Select>
                </FormControl>
                
                <FormControl id="nivel" isRequired>
                  <FormLabel>Nível</FormLabel>
                  <Select 
                    name="nivel"
                    placeholder="Selecione o nível"
                    value={formData.nivel}
                    onChange={handleChange}
                  >
                    <option value="Fundamental I">Fundamental I</option>
                    <option value="Fundamental II">Fundamental II</option>
                    <option value="Médio">Médio</option>
                    <option value="Superior">Superior</option>
                  </Select>
                </FormControl>
                
                <FormControl id="topico" isRequired>
                  <FormLabel>Tópico</FormLabel>
                  <Input 
                    name="topico"
                    placeholder="Ex: Equações do 2º grau"
                    value={formData.topico}
                    onChange={handleChange}
                  />
                </FormControl>
                
                <Button 
                  type="submit" 
                  colorScheme="blue" 
                  isLoading={isLoading}
                  loadingText="Gerando material..."
                  size="lg"
                >
                  Gerar Material
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
        
        {generatedText && (
          <Card variant="outline">
            <CardBody>
              <Heading as="h2" size="lg" mb={4} color="blue.700" textAlign="center">
                {generatedText.tema}
              </Heading>
              <Box 
                borderWidth={1} 
                borderRadius="md" 
                p={6} 
                bg="white"
                minHeight="400px"
                overflowY="auto"
                boxShadow="sm"
                className="educational-content"
              >
                <ReactMarkdown 
                  components={{
                    h1: ({node, ...props}) => <Heading as="h1" size="xl" mt={6} mb={4} color="blue.600" {...props} />,
                    h2: ({node, ...props}) => <Heading as="h2" size="lg" mt={5} mb={3} color="blue.500" {...props} />,
                    h3: ({node, ...props}) => <Heading as="h3" size="md" mt={4} mb={2} color="blue.400" {...props} />,
                    p: ({node, ...props}) => <Text fontSize="md" lineHeight="tall" mb={4} {...props} />,
                    ul: ({node, ...props}) => <Box as="ul" pl={5} my={4} {...props} />,
                    ol: ({node, ...props}) => <Box as="ol" pl={5} my={4} {...props} />,
                    li: ({node, ...props}) => <Box as="li" pb={1} fontSize="md" {...props} />,
                    strong: ({node, ...props}) => <Text as="span" fontWeight="bold" color="blue.700" {...props} />,
                    em: ({node, ...props}) => <Text as="span" fontStyle="italic" {...props} />,
                  }}
                >
                  {generatedText.conteudo}
                </ReactMarkdown>
              </Box>
            </CardBody>
            <Divider />
            <CardFooter>
              <HStack spacing={4} justifyContent="center" width="100%">
                <Button 
                  onClick={() => handleExport('pdf')}
                  colorScheme="red" 
                  isLoading={isExporting}
                  variant="outline"
                  leftIcon={<i className="fas fa-file-pdf"></i>}
                >
                  Exportar como PDF
                </Button>
                <Button 
                  onClick={() => handleExport('docx')}
                  colorScheme="blue" 
                  isLoading={isExporting}
                  variant="outline"
                  leftIcon={<i className="fas fa-file-word"></i>}
                >
                  Exportar como DOCX
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        )}
      </VStack>
    </Container>
  );
};

export default MaterialGenerator;