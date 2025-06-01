
import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function SavedContext({ passage }) {
  if (!passage) return null;

  return (
    <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 }, mb: { xs: 2, sm: 3 }, backgroundColor: 'grey.100' }}>
      <Typography variant="h6" gutterBottom>
        Contexto Salvo:
      </Typography>
      <Typography
        variant="body2"
        component="pre" // Usar 'pre' para manter a formatação do texto
        sx={{
          whiteSpace: 'pre-wrap', // Para quebrar linha e respeitar espaços
          maxHeight: '150px',
          overflowY: 'auto',
          p: 1,
          border: '1px dashed grey',
          borderRadius: 1,
          background: '#fff',
          fontFamily: 'monospace' 
        }}
      >
        {passage}
      </Typography>
    </Paper>
  );
}

export default SavedContext;