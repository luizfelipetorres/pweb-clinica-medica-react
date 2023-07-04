import React from "react";
import { Typography } from "@mui/material";
export default ({ doctor }) => (
  <>
    <Typography sx={{ color: `text.secondary` }}>
      {`CRM: ${doctor.crm}`} 
    </Typography>
    <Typography sx={{ color: `text.secondary` }}>
      {`Especialidade: ${doctor.especialidade}`} 
    </Typography>
  </>
);
