import React from "react";
import { Typography } from "@mui/material";

export default ({patient}) => (
  <>
    <Typography sx={{ width: "70%", flexShrink: 0 }}>{patient.nome}</Typography>

    <Typography sx={{ width: "30%", color: "text.secondary" }}>
      {patient.cpf}
    </Typography>
  </>
);
