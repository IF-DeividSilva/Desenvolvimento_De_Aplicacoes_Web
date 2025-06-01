
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function QuestionInput({ question, onQuestionChange, onAsk }) {
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
      <Box component="section">
        <Typography variant="h5" component="h2" gutterBottom>
          2. Escreva sua Pergunta:
        </Typography>
        <TextField
          id="ask-input"
          label="Escreva sua pergunta aqui..." 
          placeholder="Escreva sua pergunta aqui..." 
          multiline
          rows={4}
          fullWidth
          value={question}
          onChange={onQuestionChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={onAsk}
          disabled={!question.trim()}
        >
          Perguntar
        </Button>
      </Box>
    </Paper>
  );
}

export default QuestionInput;