// App.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

const API_URL = 'http://localhost:8000/answer-question/';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: '90vh',
};

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
          responseMessage = data.answer ;
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
    <Container maxWidth="lg">
      {/* <CssBaseline /> */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1, flexWrap: 'wrap', gap: 1 }}>
        <Button variant="outlined" onClick={toggleHelpModal} title="Ajuda/Examplo de Uso">
          Ajuda/Examplo de Uso
        </Button>
        {currentStep > 1 && (
            <Button variant="outlined" color="warning" onClick={startOver}>
                Começar Novamente (Limpar Tudo)
            </Button>
        )}
      </Box>

      <Modal open={showHelpModal} onClose={toggleHelpModal} aria-labelledby="help-modal-title" aria-describedby="help-modal-description">
        <Box sx={styleModal}>
          <Typography id="help-modal-title" variant="h6" component="h2" gutterBottom>Examplo de Uso</Typography>
          <Box component="section" id="help-modal-description">
            <Typography variant="subtitle1" component="h3" gutterBottom>Escreva seu texto:</Typography>
            <TextField fullWidth multiline readOnly rows={5} variant="outlined" value={`A Revolução Francesa foi um período de intensa agitação social e política na França que durou de 1789 a 1799. Ela teve um impacto profundo e duradouro não apenas na história francesa, mas em toda a Europa e no mundo ocidental. A revolução derrubou a monarquia absolutista, estabeleceu uma república e culminou com a ascensão de Napoleão Bonaparte. Entre suas causas principais estavam a crise financeira do Estado francês, a desigualdade social com a divisão em três estados (clero, nobreza e povo), e a influência das ideias iluministas que questionavam o poder absoluto dos reis e os privilégios da nobreza e do clero. A Queda da Bastilha em 14 de julho de 1789 é considerada o marco inicial da revolução.`} sx={{ mb: 2 }} />
            <Typography variant="subtitle1" component="h3" gutterBottom>Escreva sua pergunta:</Typography>
            <TextField fullWidth multiline readOnly rows={2} variant="outlined" value={`Qual evento é considerado o marco inicial da Revolução Francesa?`} sx={{ mb: 2 }} />
            <TextField fullWidth multiline readOnly rows={2} variant="outlined" value={`Quem ascendeu ao poder ao final do período revolucionário?`} sx={{ mb: 2 }} />
            <Typography variant="subtitle1" component="h3" gutterBottom>Sua Respota (Examplo):</Typography>
            <Typography variant="body1" sx={{ p: 1, border: '1px solid lightgray', borderRadius: 1 }}>A Queda da Bastilha</Typography>
            <Typography variant="body1" sx={{ p: 1, border: '1px solid lightgray', borderRadius: 1 }}>Napoleão Bonaparte </Typography>
          </Box>
          <Box sx={{ mt: 3, textAlign: 'right' }}><Button variant="contained" onClick={toggleHelpModal}>Close</Button></Box>
        </Box>
      </Modal>

      <Box sx={{ my: 2 }}>
        <Box component="header" sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">IA para Resposta a perguntas em linguagem natural (via API)</Typography>
        </Box>

        {currentStep === 1 && (
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box component="section">
              <Typography variant="h5" component="h2" gutterBottom>1. Escreva seu texto aqui:</Typography>
              <TextField id="text-input" label="Escreva seu texto aqui..." placeholder="Escreva seu texto aqui..." multiline rows={6} fullWidth value={textInput} onChange={(e) => setTextInput(e.target.value)} variant="outlined" sx={{ mb: 2 }} />
              <Button variant="contained" color="primary" onClick={saveText} disabled={!textInput.trim()}>Salvar Texto</Button>
            </Box>
          </Paper>
        )}

        {currentStep >= 2 && passage && (
            <Paper elevation={1} sx={{ p:2, mb:3, backgroundColor: 'grey.100'}}>
                <Typography variant="h6" gutterBottom>Contexto Salvo:</Typography>
                <Typography variant="body2" component="pre" sx={{whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto', p:1, border: '1px dashed grey', borderRadius:1, background: '#fff'}}>
                    {passage}
                </Typography>
            </Paper>
        )}

        {currentStep === 2 && (
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box component="section">
              <Typography variant="h5" component="h2" gutterBottom>2. Write your ask:</Typography>
              <TextField id="ask-input" label="Escreva seu texto aqui..." placeholder="Escreva seu texto aqui..." multiline rows={4} fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} variant="outlined" sx={{ mb: 2 }} />
              <Button variant="contained" color="secondary" onClick={answering} disabled={!question.trim()}>Perguntar</Button>
            </Box>
          </Paper>
        )}

        {currentStep === 3 && (
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box component="section">
              <Typography variant="h5" component="h2" gutterBottom>3. Sua resposta:</Typography>
              <Box id="results" sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, minHeight: '60px', whiteSpace: 'pre-wrap' }}>
                <Typography variant="body1">{answer || "Processando..."}</Typography>
              </Box>
              <Box sx={{mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2}}> {/* Adicionado flexWrap e gap */}
                <Button variant="outlined" color="primary" onClick={() => { setQuestion(''); setAnswer(''); setCurrentStep(2); }}>
                    Fazer outra pergunta (mesmo texto)
                </Button>
                <Button variant="contained" color="successo" onClick={startOver}> {/* Usando 'successo' para cor verde */}
                    Inserir Novo Texto (Limpar Tudo)
                </Button>
              </Box>
            </Box>
          </Paper>
        )}

        {(currentStep >=1) && (
            <>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Box component="section">
                    <Typography variant="h5" component="h2" gutterBottom>Sobre nós</Typography>
                    <Typography variant="body1" paragraph>Nossa plataforma foi projetada para fornecer respostas rápidas e precisas às suas perguntas sobre qualquer assunto. Com uma interface intuitiva, basta inserir seu texto e fazer sua pergunta, e nosso sistema de IA (via API) cuidará do resto — entregando respostas relevantes e claras.</Typography>
                </Box>
                </Paper>
                <Box component="footer" sx={{ textAlign: 'center', mt: 5, py: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="textSecondary">Desenvolvido por Deivid da Silva Galvão</Typography>
                <Typography variant="body2" color="textSecondary">Data: {new Date().toLocaleDateString('pt-BR')}</Typography>
                <Typography variant="body2" color="textSecondary">Email: deivid.2002@alunos.utfpr.edu.br</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>&copy; {new Date().getFullYear()} UTFPR-EngComp - Um projeto para auxiliar no aprendizado.</Typography>
                </Box>
            </>
        )}
      </Box>
    </Container>
  );
}

export default App;