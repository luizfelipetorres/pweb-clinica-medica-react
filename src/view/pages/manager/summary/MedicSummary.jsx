import React from "react";
import { Typography } from "@mui/material";

export default ({medic}) => {
  return (
    <>
      <Typography sx={{ width: "40%", flexShrink: 0 }}>
        {medic.nome}
      </Typography>
      <Typography sx={{ width: "30%", color: "text.secondary" }}>
        {medic.especialidade}
      </Typography>
      <Typography sx={{ width: "30%", color: "text.secondary" }}>
        {medic.crm}
      </Typography>
    </>
  );
};
