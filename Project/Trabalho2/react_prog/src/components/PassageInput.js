
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function PassageInput({ textInput, onTextInputChange, onSaveText }) {
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
      <Box component="section">
        <Typography variant="h5" component="h2" gutterBottom>
          1. Escreva seu texto aqui:
        </Typography>
        <TextField
          id="text-input"
          label="Escreva seu texto aqui..."
          placeholder="Escreva seu texto aqui..."
          multiline
          rows={6}
          fullWidth
          value={textInput}
          onChange={onTextInputChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onSaveText}
          disabled={!textInput.trim()}
        >
          Salvar Texto
        </Button>
      </Box>
    </Paper>
  );
}

export default PassageInput;