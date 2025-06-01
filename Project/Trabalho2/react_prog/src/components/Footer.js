
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        mt: { xs: 3, sm: 5 },
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Desenvolvido por Deivid da Silva Galvão
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Data: {new Date().toLocaleDateString('pt-BR')}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Email: deivid.2002@alunos.utfpr.edu.br
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        &copy; {new Date().getFullYear()} UTFPR-EngComp - Um projeto para auxiliar no aprendizado.
      </Typography>
    </Box>
  );
}

export default Footer;