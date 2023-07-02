import * as React from 'react';
import { useForm } from "react-hook-form";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import '../manager.css';


export default () => {

  const {
    register,
    handleSubmit,
  } = useForm();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="container">
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, margin: 2 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Pesquisar..."
          inputProps={{ 'aria-label': 'pesquisar...' }}
          {...register("search")}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon onClick={() => handleSubmit(onSubmit)()}/>
        </IconButton>
      </Paper>

      <div className='repeat-container'>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '40%', flexShrink: 0 }}> Luís Fernando Cezar dos Santos </Typography>
            <Typography sx={{ width: '30%', color: 'text.secondary' }}> Ortopedista </Typography>
            <Typography sx={{ width: '30%', color: 'text.secondary' }}> CRM 12345-PR </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary' }}> luisfernando_cezar@hotmail.com </Typography>
            <Typography sx={{ color: 'text.secondary' }}> (31) 3333-3333 </Typography>
            <Typography sx={{ color: 'text.secondary' }}> Rua teste, Bairro teste, Bahia, Brasil </Typography>
            <Typography sx={{ color: 'text.secondary' }}> CEP: 31.210-344 </Typography>
            <Divider />
            <Stack marginTop={2} direction="row" spacing={5}>
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Editar
              </Button>
              <Button variant="contained" endIcon={<SendIcon />}>
                Desativar perfil
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: '40%', flexShrink: 0 }}> Luís Fernando Cezar dos Santos </Typography>
            <Typography sx={{ width: '30%', color: 'text.secondary' }}> Ortopedista </Typography>
            <Typography sx={{ width: '30%', color: 'text.secondary' }}> CRM 12345-PR </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary' }}> luisfernando_cezar@hotmail.com </Typography>
            <Typography sx={{ color: 'text.secondary' }}> (31) 3333-3333 </Typography>
            <Typography sx={{ color: 'text.secondary' }}> Rua teste, Bairro teste, Bahia, Brasil </Typography>
            <Typography sx={{ color: 'text.secondary' }}> CEP: 31.210-344 </Typography>
            <Divider />
            <Stack marginTop={2} direction="row" spacing={5}>
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Editar
              </Button>
              <Button variant="contained" endIcon={<SendIcon />}>
                Desativar perfil
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: '40%', flexShrink: 0 }}> Luís Fernando Cezar dos Santos </Typography>
            <Typography sx={{ width: '30%', color: 'text.secondary' }}> Ortopedista </Typography>
            <Typography sx={{ width: '30%', color: 'text.secondary' }}> CRM 12345-PR </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary' }}> luisfernando_cezar@hotmail.com </Typography>
            <Typography sx={{ color: 'text.secondary' }}> (31) 3333-3333 </Typography>
            <Typography sx={{ color: 'text.secondary' }}> Rua teste, Bairro teste, Bahia, Brasil </Typography>
            <Typography sx={{ color: 'text.secondary' }}> CEP: 31.210-344 </Typography>
            <Divider />
            <Stack marginTop={2} direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Editar
              </Button>
              <Button variant="contained" endIcon={<SendIcon />}>
                Desativar perfil
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </div>
      <Box sx={{ '& > :not(style)': { m: 2 } }}>
        <Fab color="primary" variant="extended">
          <AddIcon sx={{ mr: 1 }} />
          Cadastrar novo médico
        </Fab>
      </Box>
    </div>
  );
};