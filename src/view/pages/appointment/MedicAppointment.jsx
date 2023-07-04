import { Save } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Fab, Pagination, PaginationItem, Radio } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Api from "../../../services/Api";
import PersonDetail from "../manager/detail/PersonDetail";
import MedicSummary from "../manager/summary/MedicSummary";

export default () => {
  const [data, setData] = useState([]);
  const { crm } = useParams() || "";
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSelection = (panel) => (event, isSelected) => {
    setSelected(isSelected ? panel : false);
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
      <Stack spacing={1} className="container">
        <h1>Seleciona o médico</h1>
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
                  checked={selected === item.id}
                  onChange={handleSelection(item.id)}
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

        <Box>
          <Pagination
            page={page}
            count={totalPages}
            color="primary"
            size="large"
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/medic/appointment/${crm}?page=${item.page}`}
                {...item}
              />
            )}
          />
        </Box>

      <Fab color="primary" variant="extended" disabled={!selected}>
        <Save sx={{mb: 1}}/>
        Salvar
      </Fab>
      </Stack>
    </>
  );
};
