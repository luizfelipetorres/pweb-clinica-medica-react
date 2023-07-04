import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { Pagination } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    async function loadData() {
      const response = await Api.get("/consulta");
      setAppointments(response.data.content);
      setTotalPages(response.data.totalPages);
    }

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
                    {new Date(item.data).toLocaleDateString("pt-BR")}
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
                      <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Editar
                      </Button>
                    </Link>
                    <Button variant="contained" endIcon={<SendIcon />}>
                      Desativar perfil
                    </Button>
                  </Stack>

                  <Divider />
                  <Typography sx={{ color: "text.primary" }}>
                    Dados do paciente
                  </Typography>
                  <PersonalData person={paciente} />
                  <Stack marginTop={2} direction="row" spacing={5}>
                    <Link to={`/patient/form-put/${paciente.cpf}`}>
                      <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Editar
                      </Button>
                    </Link>
                    <Button variant="contained" endIcon={<SendIcon />}>
                      Desativar perfil
                    </Button>
                  </Stack>
                  <Divider />
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
                  to={`/patient?page=${item.page}`}
                  {...item}
                />
              )}
            />
          </Box>

          <Link to={`/appointment/form-post`}>
            <Box sx={{ "& > :not(style)": { m: 2 } }}>
              <Fab color="primary" variant="extended">
                <AddIcon sx={{ mr: 1 }} />
                Cadastrar nova consulta
              </Fab>
            </Box>
          </Link>
        </Stack>
      </div>
    </>
  );
};
