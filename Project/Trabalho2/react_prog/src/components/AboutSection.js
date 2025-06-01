
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function AboutSection() {
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
      <Box component="section">
        <Typography variant="h5" component="h2" gutterBottom>
          Sobre nós
        </Typography>
        <Typography variant="body1" paragraph>
          Nossa plataforma foi projetada para fornecer respostas rápidas e precisas às suas
          perguntas sobre qualquer assunto. Com uma interface intuitiva, basta inserir seu
          texto e fazer sua pergunta, e nosso sistema de IA (via API) cuidará do
          resto — entregando respostas relevantes e claras.
        </Typography>
      </Box>
    </Paper>
  );
}

export default AboutSection;