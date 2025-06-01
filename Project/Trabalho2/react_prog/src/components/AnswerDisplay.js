
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function AnswerDisplay({ answer, onAskAnother, onStartOver }) {
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
      <Box component="section">
        <Typography variant="h5" component="h2" gutterBottom>
          3. Sua resposta:
        </Typography>
        <Box
          id="results"
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            minHeight: '60px',
            whiteSpace: 'pre-wrap',
          }}
        >
          <Typography variant="body1">{answer || 'Processando...'}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onAskAnother}
          >
            Fazer outra pergunta (mesmo texto)
          </Button>
          <Button
            variant="contained"
            color="success" // Corrigido de 'successo'
            onClick={onStartOver}
          >
            Inserir Novo Texto (Limpar Tudo)
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default AnswerDisplay;