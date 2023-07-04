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
import Typography from '@mui/material/Typography';
import './manager.css';

export default () => {

  const [data, setData] = useState([])
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const [totalPages, setTotalPages] = useState(0)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    async function loadData() {
      const response = await Api.get(`/medico?page=${page-1}`);
      setData(response.data.content);
      setTotalPages(response.data.totalPages)
    }

    loadData();
  }, [page])

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
                style={{ borderLeft: "solid 5px red"}}
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
              )} />
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
}
