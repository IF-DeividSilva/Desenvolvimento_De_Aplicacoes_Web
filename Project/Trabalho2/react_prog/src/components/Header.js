import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Header() {
  return (
    <Box component="header" sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h4" component="h1">
        IA para Resposta a perguntas em linguagem natural (via API)
      </Typography>
    </Box>
  );
}

export default Header;