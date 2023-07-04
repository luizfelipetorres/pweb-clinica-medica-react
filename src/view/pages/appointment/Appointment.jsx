import { Save } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Fab, Pagination, PaginationItem, Radio } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "dayjs/locale/pt-br";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Api from "../../../services/Api";
import PersonDetail from "../manager/detail/PersonDetail";
import MedicSummary from "../manager/summary/MedicSummary";
import { postData } from "./AppointmentInt";

export default () => {
  const [data, setData] = useState([]);
  const { document, type } = useParams() || "";
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [request, setRequest] = useState({
    medicoCrm: null,
    pacienteCpf: null,
    dataHoraConsulta: null,
  });
  const [dateTime, setDateTime] = useState(null);

  const handleDateTimeChange = (newDateTime) => {
    console.log(newDateTime);
    setDateTime(newDateTime);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSelection = (item) => (event, isSelected) => {
    setSelected(isSelected ? item : false);
  };

  const handleSubmit = () => {postData(request)};

  useEffect(() => {
    async function loadData() {
      const response = await Api.get(`/${type}?page=${page - 1}`);
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
    }

    loadData();
  }, [page]);

  useEffect(() =>{
    const obj = request
    if (type === "medico") {
      obj.pacienteCpf = document;
      obj.medicoCrm = selected.crm;
    } else {
      obj.medicoCrm = document;
      obj.pacienteCpf = selected.cpf;
    }
    obj.dataHoraConsulta = dateTime;
    setRequest(obj);
  }, [selected, dateTime])


  return (
    <>
      <Stack spacing={1} className="container">
        <h1>Seleciona o {type}</h1>
        <Divider />
        {data.map((item) => {
          return (
            <Accordion
              radioGroup="medic-group"
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
                <Radio
                  checked={selected.id === item.id}
                  onChange={handleSelection(item)}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <MedicSummary medic={item} />
              </AccordionSummary>
              <AccordionDetails>
                <PersonDetail person={item} />
                <Divider />
              </AccordionDetails>
            </Accordion>
          );

          
        })}

        <Box spacing={20}>
          <Pagination
            page={page}
            count={totalPages}
            color="primary"
            size="large"
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/appointment/${type}/${document}?page=${item.page}`}
                {...item}
              />
            )}
          />
        </Box>

        <Box marginTop={20}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
            <DateTimePicker
              format="DD/MM/YYYY - hh:mm"
              disablePast={true}
              label="Data e hora da consulta"
              defaultValue={dateTime}
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>
        </Box>

        <Box mt={10}>
          <Fab
            color="primary"
            variant="extended"
            disabled={!selected || !dateTime}
            onClick={() => handleSubmit()}
          >
            <Save sx={{ m: 1 }} />
            Salvar
          </Fab>
        </Box>
      </Stack>
    </>
  );
};
