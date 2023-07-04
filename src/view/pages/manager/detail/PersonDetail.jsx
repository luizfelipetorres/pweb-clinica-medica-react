import React from "react";
import ProfessionalData from "./ProfessionalDetail";
import { Typography } from "@mui/material";
import AddressData from "./AddressDetail";

export default ({ person }) => {
  return (
    <>
      <Typography sx={{ color: "text.secondary" }}>
        {`Email: ${person.email}`}
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>
        {`Telefone: ${person.telefone}`}
      </Typography>
      {person?.crm && <ProfessionalData doctor={person} />}
      <AddressData person={person}/>
    </>
  );
};
