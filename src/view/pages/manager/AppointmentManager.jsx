import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../../services/Api";
import PersonalData from "./detail/PersonDetail";
import "./manager.css";

export default (props) => {
  const { register, handleSubmit } = useForm();
  const [appointments, setAppointments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    console.log(id);
    setOpen((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleClose = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const deleteAppointment = async (id) => {
    console.log(id);
    await Api.delete("/consulta", {
      data: {
        consultaId: id,
        motivo: "OUTROS",
      },
    })
      .then((result) => {
        toast.success("Consulta deletada com sucesso! ");
        loadData()
        ;
      })
      .catch((error) => toast.error(error.response.data.detalhes));
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function loadData() {
    const response = await Api.get("/consulta");
    setAppointments(response.data.content);
    setTotalPages(response.data.totalPages);
  }
  useEffect( () => {

    loadData();
  }, [page]);

  return (
    <>
      <div className="container">
        <Stack spacing={1}>
          <h1>Listagem de consultas</h1>
          <Divider />
          {appointments.map((item) => {
            const { medico, paciente } = { ...item };
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
                  <Typography sx={{ width: "40%", flexShrink: 0 }}>
                    {medico.nome}
                  </Typography>
                  <Typography sx={{ width: "30%", color: "text.secondary" }}>
                    {paciente.nome}
                  </Typography>
                  <Typography sx={{ width: "30%", color: "text.secondary" }}>
                    {format(new Date(item.data), "dd/MM/yyyy - HH:mm")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.primary" }}>
                    Dados do médico
                  </Typography>
                  <PersonalData person={medico} />
                  <Stack
                    marginTop={2}
                    marginBottom={2}
                    direction="row"
                    spacing={5}
                  >
                    <Link to={`/medic/form-put/${medico.crm}`}>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        Editar
                      </Button>
                    </Link>
                  </Stack>

                  <Divider />
                  <Typography sx={{ color: "text.primary" }}>
                    Dados do paciente
                  </Typography>
                  <PersonalData person={paciente} />
                  <Stack
                    marginTop={2}
                    marginBottom={2}
                    direction="row"
                    spacing={5}
                  >
                    <Link to={`/patient/form-put/${paciente.cpf}`}>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        Editar
                      </Button>
                    </Link>
                  </Stack>

                  <Divider />

                  <Box marginTop={2}>
                    <Button
                      onClick={() => handleClickOpen(item.id)}
                      color="error"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                    >
                      Apagar consulta
                    </Button>
                  </Box>
                </AccordionDetails>

                <Dialog
                  open={open[item.id]}
                  onClose={() => handleClose(item.id)}
                  PaperProps={{
                    style: { boxShadow: "none", border: "2px solid #ccc" },
                  }}
                  slotProps={{
                    backdrop: {
                      style: {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(5px)",
                      },
                    },
                  }}
                >
                  <DialogTitle color="primary" id="alert-dialog-title">
                    Deseja desativar este perfil ?
                  </DialogTitle>
                  <DialogContent>
                    <Box textAlign="center" my={1}>
                      <DialogContentText id="alert-dialog-description">
                        Confirma o cancelamento da consulta para{" "}
                        <Typography
                          variant="body1"
                          component="span"
                          fontWeight="bold"
                        >
                          {paciente.nome}{" "}
                        </Typography>
                        com o médico{" "}
                        <Typography
                          variant="body1"
                          component="span"
                          fontWeight="bold"
                        >
                          {" "}
                          {medico.nome}{" "}
                        </Typography>
                        ?
                      </DialogContentText>
                    </Box>
                  </DialogContent>

                  <DialogActions>
                    <Button
                      variant="contained"
                      onClick={() => handleClose(item.id)}
                      autoFocus
                    >
                      cancelar
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => deleteAppointment(item.id)}
                    >
                      Excluir consulta
                    </Button>
                  </DialogActions>
                </Dialog>
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
                  to={`/patient?page=${item.page}`}
                  {...item}
                />
              )}
            />
          </Box>

      
        </Stack>
      </div>
    </>
  );
};
