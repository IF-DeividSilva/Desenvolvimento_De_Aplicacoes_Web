import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importando os componentes e a API
import Header from './components/Header';
import HelpModal from './components/HelpModal';
import PassageInput from './components/PassageInput';
import SavedContext from './components/SavedContext';
import QuestionInput from './components/QuestionInput';
import AnswerDisplay from './components/AnswerDisplay';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

const API_URL = 'http://localhost:8000/answer-question/';

// Criação do tema para o Material-UI
let theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
     success: { main: '#2e7d32'}, 
  },
});
theme = responsiveFontSizes(theme);

// Função principal do aplicativo React
function App() {
  // Estados para armazenar os dados do usuário e controle de fluxo
  const [textInput, setTextInput] = useState(''); // Texto digitado pelo usuário
  const [passage, setPassage] = useState('');     // Texto salvo como contexto
  const [question, setQuestion] = useState('');   // Pergunta do usuário
  const [answer, setAnswer] = useState('');       // Resposta da API
  const [showHelpModal, setShowHelpModal] = useState(false); // Controle do modal de ajuda
  const [currentStep, setCurrentStep] = useState(1);         // Passo atual do fluxo

  // Função para salvar o texto de contexto
  const saveText = () => {
    if (!textInput.trim()) {
      alert('Por favor, escreva um texto antes de salvar.');
      return;
    }
    setPassage(textInput);
    alert('Texto salvo com sucesso!');
    setCurrentStep(2); // Avança para o próximo passo
  };

  // Função para enviar a pergunta para a API e obter a resposta
  const answering = async () => {
    if (!passage.trim()) {
      alert('Erro: Nenhum texto de contexto foi salvo.');
      setCurrentStep(1);
      return;
    }
    if (!question.trim()) {
      alert('Por favor, escreva a sua pergunta.');
      return;
    }
    setAnswer('Analisando sua pergunta com a API...');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passage, question }),
      });
      let responseMessage = '';
      if (!response.ok) {
        // Trata erro da API
        const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido na API.' }));
        console.error('Erro da API:', errorData);
        responseMessage = `Erro ao obter resposta da API: ${errorData.detail || response.statusText}`;
      } else {
        // Resposta bem-sucedida
        const data = await response.json();
        if (data.error) {
          responseMessage = data.error;
        } else if (data.answer) {
          responseMessage = data.answer;
        } else {
          responseMessage = 'Nenhuma resposta encontrada pela API.';
        }
      }
      setAnswer(responseMessage);
      setCurrentStep(3); // Avança para o passo de exibição da resposta
    } catch (err) {
      // Erro de conexão com a API
      console.error('Erro ao conectar com a API:', err);
      setAnswer('Erro de conexão ao tentar obter resposta. A API está rodando?');
      setCurrentStep(3);
    }
  };

  // Alterna a exibição do modal de ajuda
  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  // Reinicia todo o fluxo e limpa os dados
  const startOver = () => {
    setTextInput('');
    setPassage('');
    setQuestion('');
    setAnswer('');
    setCurrentStep(1);
  };

  // Renderização do componente
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {/* Barra superior com botões de ajuda e reinício */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: {xs:1, sm:2}, py:1, flexWrap: 'wrap', gap: 1 }}>
          <Button variant="outlined" onClick={toggleHelpModal} title="Examplo de Uso">
            Examplo de Uso
          </Button>
          {currentStep > 1 && (
            <Button variant="outlined" color="warning" onClick={startOver}>
              Começar Novamente (Limpar Tudo)
            </Button>
          )}
        </Box>

        {/* Modal de ajuda */}
        <HelpModal open={showHelpModal} onClose={toggleHelpModal} />

        <Box sx={{ my: { xs: 2, sm: 3 } }}>
          {/* Cabeçalho */}
          <Header />

          {/* Passo 1: Entrada do texto de contexto */}
          {currentStep === 1 && (
            <PassageInput
              textInput={textInput}
              onTextInputChange={(e) => setTextInput(e.target.value)}
              onSaveText={saveText}
            />
          )}

          {/* Exibe o contexto salvo a partir do passo 2 */}
          {currentStep >= 2 && <SavedContext passage={passage} />}

          {/* Passo 2: Entrada da pergunta */}
          {currentStep === 2 && (
            <QuestionInput
              question={question}
              onQuestionChange={(e) => setQuestion(e.target.value)}
              onAsk={answering}
            />
          )}

          {/* Passo 3: Exibição da resposta */}
          {currentStep === 3 && (
            <AnswerDisplay
              answer={answer}
              onAskAnother={() => {
                setQuestion('');
                setAnswer('');
                setCurrentStep(2);
              }}
              onStartOver={startOver}
            />
          )}

          {/* Seções About e Footer sempre visíveis */}
          <AboutSection />
          <Footer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;