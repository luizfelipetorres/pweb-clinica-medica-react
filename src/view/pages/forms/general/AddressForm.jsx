import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import "../form.css";

export default ({ register, errors, isUpdate, uf }) => {

  return (
    <>
      <Stack spacing={2}>
        <h2>Endereço</h2>
        <Divider />
        <Box>
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

        <Box>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label={isUpdate ? "" : "Número"}
              variant="outlined"
              className={errors?.numero && "input-error"}
              type="text"
              placeholder="Digite o número..."
              {...register("numero", { required: false })} />
          </FormControl>
        </Box>
        {errors?.numero?.type === "required" && (
          <p className="error-message">Número é obrigatório.</p>
        )}

        <Box>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label={isUpdate ? "" : "Complemento"}
              variant="outlined"
              className={errors?.complemento && "input-error"}
              type="text"
              placeholder="Digite o complemento..."
              {...register("complemento", { required: false })} />
          </FormControl>
        </Box>
        {errors?.complemento?.type === "required" && (
          <p className="error-message">Complemento é obrigatório.</p>
        )}

        <Box>
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

        <Box>
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

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">UF</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="outlined"
              className={errors?.uf && "input-error"}
              {...(isUpdate ? {value: uf}: {})}
              {...register("uf", { validate: (value) => value !== "0" })}
            >
              <MenuItem value={"0"}>Selecione o estado...</MenuItem>
              <MenuItem value={"AC"}>Acre (AC)</MenuItem>
              <MenuItem value={"AL"}>Alagoas (AL)</MenuItem>
              <MenuItem value={"AP"}>Amapá (AP)</MenuItem>
              <MenuItem value={"AM"}>Amazonas (AM)</MenuItem>
              <MenuItem value={"BA"}>Bahia (BA)</MenuItem>
              <MenuItem value={"CE"}>Ceará (CE)</MenuItem>
              <MenuItem value={"DF"}>Distrito Federal (DF)</MenuItem>
              <MenuItem value={"ES"}>Espírito Santo (ES)</MenuItem>
              <MenuItem value={"GO"}>Goiás (GO)</MenuItem>
              <MenuItem value={"MA"}>Maranhão (MA)</MenuItem>
              <MenuItem value={"MT"}>Mato Grosso (MT)</MenuItem>
              <MenuItem value={"MS"}>Mato Grosso do Sul (MS)</MenuItem>
              <MenuItem value={"MG"}>Minas Gerais (MG)</MenuItem>
              <MenuItem value={"PA"}>Pará (PA)</MenuItem>
              <MenuItem value={"PB"}>Paraíba (PB)</MenuItem>
              <MenuItem value={"PR"}>Paraná (PR)</MenuItem>
              <MenuItem value={"PE"}>Pernambuco (PE)</MenuItem>
              <MenuItem value={"PI"}>Piauí (PI)</MenuItem>
              <MenuItem value={"RJ"}>Rio de Janeiro (RJ)</MenuItem>
              <MenuItem value={"RN"}>Rio Grande do Norte (RN)</MenuItem>
              <MenuItem value={"RS"}>Rio Grande do Sul (RS)</MenuItem>
              <MenuItem value={"RO"}>Rondônia (RO)</MenuItem>
              <MenuItem value={"RR"}>Roraima (RR)</MenuItem>
              <MenuItem value={"SC"}>Santa Catarina (SC)</MenuItem>
              <MenuItem value={"SP"}>São Paulo (SP)</MenuItem>
              <MenuItem value={"SE"}>Sergipe (SE)</MenuItem>
              <MenuItem value={"TO"}>Tocantins (TO)</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {errors?.uf?.type === "validate" && (
          <p className="error-message">UF é obrigatório.</p>
        )}

        <Box>
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
      </Stack>
    </>
  );
};