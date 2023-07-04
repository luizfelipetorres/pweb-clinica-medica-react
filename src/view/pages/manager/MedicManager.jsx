import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Api from "../../../services/Api";
import PersonDetail from "./detail/PersonDetail";
import "./manager.css";
import MedicSummary from "./summary/MedicSummary";

export default () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [totalPages, setTotalPages] = useState(0);
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

  const handleDisableMedic = async (crm) => {
    await Api.delete("/medico/"+crm);    
    window.location.reload();
    setOpen(false);
  };

  useEffect(() => {
    async function loadData() {
      const response = await Api.get(`/medico?page=${page - 1}`);
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
    }

    loadData();
  }, [page]);

  return (
    <>
      <div className="container">
        <Stack spacing={1}>
          <h1>Listagem de médicos</h1>
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
                  <MedicSummary medic={item} />
                </AccordionSummary>
                <AccordionDetails>
                  <PersonDetail person={item} />

                  <Divider />
                  <Stack marginTop={2} direction="row" spacing={5}>
                    <Link to={`/medic/form-put/${item.crm}`}>
                      <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Editar
                      </Button>
                    </Link>
                    <Button variant="contained" onClick={() => handleClickOpen(item.crm)}  endIcon={<SendIcon />}>
                      Desativar perfil
                    </Button>

                    <Dialog
                      open={open[item.crm]}
                      onClose={() => handleClose(item.crm)}
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
                              com o crm <Typography variant="body1" component="span" fontWeight="bold"> {item.crm} </Typography>  serão desabilitadas e não estarão disponíveis para futuras consultas.
                          </DialogContentText>
                        </Box>
                      </DialogContent>

                      <DialogActions>
                        <Button variant="contained" onClick={() => handleClose(item.crm)} autoFocus>
                          cancelar
                        </Button>
                        <Button variant="outlined" onClick={() => handleDisableMedic(item.crm)}>Desativar este perfil</Button>
                      </DialogActions>
                    </Dialog>
                    <Link to={`/medic/appointment/${item.crm}`}>
                      <Button variant="contained" endIcon={<SendIcon />}>
                        Marcar consulta
                      </Button>
                    </Link>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            );
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
                  to={`/medic?page=${item.page}`}
                  {...item}
                />
              )}
            />
          </Box>

          <Link to={`/medic/form-post`}>
            <Box marginTop={2}>
              <Fab color="primary" variant="extended">
                <AddIcon sx={{ mr: 1 }} />
                Cadastrar novo médico
              </Fab>
            </Box>
          </Link>
        </Stack>
      </div>
    </>
  );
};
