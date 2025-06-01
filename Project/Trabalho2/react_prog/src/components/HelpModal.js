
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%' },
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },
  overflowY: 'auto',
  maxHeight: '90vh',
};

function HelpModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="help-modal-title"
      aria-describedby="help-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="help-modal-title" variant="h6" component="h2" gutterBottom>
          Examplo de Uso
        </Typography>
        <Box component="section" id="help-modal-description">
          <Typography variant="subtitle1" component="h3" gutterBottom>
            Escreva seu texto:
          </Typography>
          <TextField
            fullWidth
            multiline
            readOnly
            rows={5}
            variant="outlined"
            value={`A Revolução Francesa foi um período de intensa agitação social e política na França que durou de 1789 a 1799. Ela teve um impacto profundo e duradouro não apenas na história francesa, mas em toda a Europa e no mundo ocidental. A revolução derrubou a monarquia absolutista, estabeleceu uma república e culminou com a ascensão de Napoleão Bonaparte. Entre suas causas principais estavam a crise financeira do Estado francês, a desigualdade social com a divisão em três estados (clero, nobreza e povo), e a influência das ideias iluministas que questionavam o poder absoluto dos reis e os privilégios da nobreza e do clero. A Queda da Bastilha em 14 de julho de 1789 é considerada o marco inicial da revolução.`}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle1" component="h3" gutterBottom>
            Escreva sua pergunta:
          </Typography>
          <TextField
            fullWidth
            multiline
            readOnly
            rows={2} 
            variant="outlined"
            value={`Qual evento é considerado o marco inicial da Revolução Francesa?`}
            sx={{ mb: 1 }} // Ajustado
          />
          <TextField
            fullWidth
            multiline
            readOnly
            rows={2} 
            variant="outlined"
            value={`Quem ascendeu ao poder ao final do período revolucionário?`}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle1" component="h3" gutterBottom>
            Sua Respota (Examplo):
          </Typography>
          <Typography variant="body1" sx={{ p: 1, border: '1px solid lightgray', borderRadius: 1, mb: 1 }}>
            A Queda da Bastilha
          </Typography>
          <Typography variant="body1" sx={{ p: 1, border: '1px solid lightgray', borderRadius: 1 }}>
            Napoleão Bonaparte
          </Typography>
        </Box>
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button variant="contained" onClick={onClose}>
            Sair
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default HelpModal;