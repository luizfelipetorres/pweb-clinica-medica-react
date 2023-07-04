import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import Api from "../../../services/Api";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import './manager.css';
import PersonalData from './detail/PersonDetail';
import PatientSummary from './summary/PatientSummary';

export default () => {

  const [data, setData] = useState([])
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const [totalPages, setTotalPages] = useState(0)
  const [open, setOpen] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = (crm) => {
    setOpen((prevState) => ({
      ...prevState,
      [crm]: true,
    }));
  };

  const handleClose = (crm) => {
    setOpen((prevState) => ({
      ...prevState,
      [crm]: false,
    }));
  };

  const handleDisablePatient = async (cpf) => {
    await Api.delete("/paciente/"+cpf);    
    window.location.reload();
    setOpen(false);
  };

  useEffect(() => {
    async function loadData() {
      const response = await Api.get(`/paciente?page=${page - 1}`);
      setData(response.data.content);
      setTotalPages(response.data.totalPages)
    }

    loadData();
  }, [page])

  return (
    <>
      <div className="container">
        <Stack spacing={1}>
          <h1>Listagem de pacientes</h1>
          <Divider />
          {data.map((item) => {
            return (
              <Accordion
                key={item.id}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
                style={{ borderLeft: "solid 5px red" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                <PatientSummary patient={item} />
                </AccordionSummary>
                <AccordionDetails>
                <PersonalData person={item} />
                  <Divider />
                  <Stack marginTop={2} direction="row" spacing={5}>
                    <Link to={`/patient/form-put/${item.cpf}`}>
                      <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Editar
                      </Button>
                    </Link>
                    <Button variant="contained" onClick={() => handleClickOpen(item.cpf)}  endIcon={<SendIcon />}>
                      Desativar perfil
                    </Button>

                    <Dialog
                      open={open[item.cpf]}
                      onClose={() => handleClose(item.cpf)}
                      PaperProps={{ style: { boxShadow: 'none', border: '2px solid #ccc' } }}
                      slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' } } }}
                      >
                      <DialogTitle color="primary" id="alert-dialog-title">
                        Deseja desativar este perfil ?
                      </DialogTitle>
                      <DialogContent>
                        <Box textAlign="center" my={1}>
                          <DialogContentText id="alert-dialog-description">
                              Ao desativar o perfil, as informações de <Typography variant="body1" component="span" fontWeight="bold">{item.nome} </Typography> 
                              com o cpf <Typography variant="body1" component="span" fontWeight="bold"> {item.cpf} </Typography>  serão desabilitadas e não estarão disponíveis para futuras consultas.
                          </DialogContentText>
                        </Box>
                      </DialogContent>

                      <DialogActions>
                        <Button variant="contained" onClick={() => handleClose(item.cpf)} autoFocus>
                          cancelar
                        </Button>
                        <Button variant="outlined" onClick={() => handleDisablePatient(item.cpf)}>Desativar este perfil</Button>

                      </DialogActions>
                    </Dialog>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )
          })}

          <Box>
            <Pagination
              page={page}
              count={totalPages}
              color="primary"
              size="large"
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/patient?page=${item.page}`}
                  {...item}
                />
              )} />
          </Box>

          <Link to={`/patient/form-post`}>
            <Box sx={{ "& > :not(style)": { m: 2 } }}>
              <Fab color="primary" variant="extended">
                <AddIcon sx={{ mr: 1 }} />
                Cadastrar novo paciente
              </Fab>
            </Box>
          </Link>
        </Stack>
      </div>
    </>
  );
};