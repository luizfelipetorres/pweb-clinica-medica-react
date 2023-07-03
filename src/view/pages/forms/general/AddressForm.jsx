import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import "../form.css";

export default ({ register, errors, isUpdate }) => {

  return (
    <>
      <h2>Endereço</h2>
      <Divider />
      <Box marginTop={2}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label={isUpdate ? "" : "Logradouro"}
            variant="outlined"
            className={errors?.logradouro && "input-error"}
            type="text"
            placeholder="Digite o logradouro..."
            {...register("logradouro", { required: true })} />
        </FormControl>
      </Box>
      {errors?.logradouro?.type === "required" && (
        <p className="error-message">Logradouro é obrigatório.</p>
      )}

      <Box marginTop={2}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label={isUpdate ? "" : "Número"}
            variant="outlined"
            className={errors?.numero && "input-error"}
            type="text"
            placeholder="Digite o número..."
            {...register("numero", { required: true })} />
        </FormControl>
      </Box>
      {errors?.numero?.type === "required" && (
        <p className="error-message">Número é obrigatório.</p>
      )}

      <Box marginTop={2}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label={isUpdate ? "" : "Complemento"}
            variant="outlined"
            className={errors?.complemento && "input-error"}
            type="text"
            placeholder="Digite o complemento..."
            {...register("complemento", { required: true })} />
        </FormControl>
      </Box>
      {errors?.complemento?.type === "required" && (
        <p className="error-message">Complemento é obrigatório.</p>
      )}

      <Box marginTop={2}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label={isUpdate ? "" : "Bairro"}
            variant="outlined"
            className={errors?.bairro && "input-error"}
            type="text"
            placeholder="Digite o bairro..."
            {...register("bairro", { required: true })} />
        </FormControl>
      </Box>
      {errors?.bairro?.type === "required" && (
        <p className="error-message">Bairro é obrigatório.</p>
      )}

      <Box marginTop={2}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label={isUpdate ? "" : "Cidade"}
            variant="outlined"
            className={errors?.cidade && "input-error"}
            type="text"
            placeholder="Digite o cidade..."
            {...register("cidade", { required: true })} />
        </FormControl>
      </Box>
      {errors?.cidade?.type === "required" && (
        <p className="error-message">Cidade é obrigatório.</p>
      )}

      <Box marginTop={2} sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">UF</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="outlined"
            className={errors?.uf && "input-error"}
            {...register("uf", { validate: (value) => value !== "0" })}
          >
            <MenuItem value={"0"}>Selecione o estado...</MenuItem>
            <MenuItem value={"BA"}>BA</MenuItem>
            <MenuItem value={"SP"}>SP</MenuItem>
            <MenuItem value={"RJ"}>RJ</MenuItem>
            <MenuItem value={"MG"}>MG</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {errors?.uf?.type === "validate" && (
        <p className="error-message">UF é obrigatório.</p>
      )}
      
      <Box marginTop={2}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label={isUpdate ? "" : "CEP"}
            variant="outlined"
            className={errors?.cep && "input-error"}
            type="text"
            placeholder="Digite o cep..."
            {...register("cep", { required: true })} />
        </FormControl>
      </Box>
      {errors?.cep?.type === "required" && (
        <p className="error-message">CEP é obrigatório.</p>
      )}
    </>
  );
};