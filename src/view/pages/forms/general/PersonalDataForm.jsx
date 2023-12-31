import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { isEmail, isMobilePhone } from "validator";
import "../form.css";

export default ({ register, errors, isUpdate }) => {

  return (
    <>
      <Stack spacing={2}>
        <h2>Dados pessoais</h2>
        <Divider />
        <Box>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label={isUpdate ? "" : "Nome completo"}
              variant="outlined"
              className={errors?.nome && "input-error"}
              type="text"
              placeholder="Digite seu nome completo..."
              {...register("nome", { required: true })} />
          </FormControl>
        </Box>
        {errors?.nome?.type === "required" && (
          <p className="error-message">Nome completo é obrigatório.</p>
        )}

        <Box>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label={isUpdate ? "" : "E-mail"}
              variant="outlined"
              className={errors?.email && "input-error"}
              type="text"
              placeholder="Digite seu e-mail..."
              disabled={isUpdate}
              {...register("email", {
                required: true,
                validate: (value) => isEmail(value),
              })} />
          </FormControl>
        </Box>
        {errors?.email?.type === "required" && (
          <p className="error-message">Email é obrigatório.</p>
        )}
        {errors?.email?.type === "validate" && (
          <p className="error-message">Email inválido.</p>
        )}

        <Box>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label={isUpdate ? "" : "Telefone"}
              variant="outlined"
              className={errors?.telefone && "input-error"}
              type="text"
              placeholder="Digite seu telefone..."
              {...register("telefone", {
                required: true,
                validate: (value) => isMobilePhone(value, 'pt-BR')
              })}
            />
          </FormControl>
        </Box>
        {errors?.telefone?.type === "required" && (
          <p className="error-message">Telefone é obrigatório.</p>
        )}
        {errors?.telefone?.type === "validate" && (
          <p className="error-message">Telefone inválido</p>
        )}
      </Stack>

    </>
  );
};
