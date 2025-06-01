// src/App.js
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importando os novos componentes
import Header from './components/Header';
import HelpModal from './components/HelpModal';
import PassageInput from './components/PassageInput';
import SavedContext from './components/SavedContext';
import QuestionInput from './components/QuestionInput';
import AnswerDisplay from './components/AnswerDisplay';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

const API_URL = 'http://localhost:8000/answer-question/';

// Criação do tema 
let theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    // primary: { main: '#1976d2' },
    // secondary: { main: '#dc004e' },
     success: { main: '#2e7d32'}, 
  },
});
theme = responsiveFontSizes(theme);

function App() {
  const [textInput, setTextInput] = useState('');
  const [passage, setPassage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const saveText = () => {
    if (!textInput.trim()) {
      alert('Por favor, escreva um texto antes de salvar.');
      return;
    }
    setPassage(textInput);
    alert('Texto salvo com sucesso!');
    setCurrentStep(2);
  };

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
        const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido na API.' }));
        console.error('Erro da API:', errorData);
        responseMessage = `Erro ao obter resposta da API: ${errorData.detail || response.statusText}`;
      } else {
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
      setCurrentStep(3);
    } catch (err) {
      console.error('Erro ao conectar com a API:', err);
      setAnswer('Erro de conexão ao tentar obter resposta. A API está rodando?');
      setCurrentStep(3);
    }
  };

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  const startOver = () => {
    setTextInput('');
    setPassage('');
    setQuestion('');
    setAnswer('');
    setCurrentStep(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
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

        <HelpModal open={showHelpModal} onClose={toggleHelpModal} />

        <Box sx={{ my: { xs: 2, sm: 3 } }}>
          <Header />

          {currentStep === 1 && (
            <PassageInput
              textInput={textInput}
              onTextInputChange={(e) => setTextInput(e.target.value)}
              onSaveText={saveText}
            />
          )}

          {currentStep >= 2 && <SavedContext passage={passage} />}

          {currentStep === 2 && (
            <QuestionInput
              question={question}
              onQuestionChange={(e) => setQuestion(e.target.value)}
              onAsk={answering}
            />
          )}

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

          {/* Renderiza About e Footer independentemente do passo*/}
          <AboutSection />
          <Footer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;