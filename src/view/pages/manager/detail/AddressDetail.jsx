import React from "react";
import { Typography } from "@mui/material";

export default ({person}) => {
  return (
    <Typography sx={{ color: "text.secondary" }}>
      {Object.values(person.endereco).map((e, index) => (
        <>
          {e}
          {index !== Object.keys(person.endereco).length - 1 ? ", " : ""}
        </>
      ))}
    </Typography>
  );
};
