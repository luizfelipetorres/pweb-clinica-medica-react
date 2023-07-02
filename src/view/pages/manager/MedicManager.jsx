import * as React from 'react';
import { useEffect, useState } from "react";
import Api from "../../../services/Api";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import './manager.css';

export default () => {

  const [medics, setMedics] = useState([])

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

  useEffect(() => {
    async function loadMedics() {
      const response = await Api.get("/medico");
      setMedics(response.data.content);
    }

    loadMedics();
  }, [])

  return (
    <>
      <div className="container">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 500,
            margin: 2,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Pesquisar..."
            inputProps={{ "aria-label": "pesquisar..." }}
            {...register("search")}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon onClick={() => handleSubmit(onSubmit)()} />
          </IconButton>
        </Paper>

        <div className="repeat-container">
          {medics.map((item) => {
            return (
              <Accordion
                key={item.id}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "40%", flexShrink: 0 }}>
                    {" "}{item.nome}{" "}
                  </Typography>
                  <Typography sx={{ width: "30%", color: "text.secondary" }}>
                    {" "}{item.especialidade}{" "}
                  </Typography>
                  <Typography sx={{ width: "30%", color: "text.secondary" }}>
                    {" "}{item.crm}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.secondary" }}>
                    {" "}{item.email}{" "}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {" "}{item.telefone}{" "}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {" "}{item.endereco.logradouro}
                    {", "}{item.endereco.bairro}
                    {", "}{item.endereco.numero}
                    {", "}{item.endereco.cidade}
                    {", "}{item.endereco.uf}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {" "}{item.endereco.cep}{" "}
                  </Typography>
                  <Divider />

                  <Stack marginTop={2} direction="row" spacing={5}>
                    <Link to={`/medic/form-put/${item.crm}`}>
                      <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Editar
                      </Button>
                    </Link>
                    <Button variant="contained" endIcon={<SendIcon />}>
                      Desativar perfil
                    </Button>

                  </Stack>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </div>
        <Link to={`/medic/form-post`}>
          <Box sx={{ "& > :not(style)": { m: 2 } }}>
            <Fab color="primary" variant="extended">
              <AddIcon sx={{ mr: 1 }} />
              Cadastrar novo médico
            </Fab>
          </Box>
        </Link>
      </div>
    </>
  );
};