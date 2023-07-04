import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CleaningIcon from "@mui/icons-material/CleaningServices";
import { Fab } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from "react-hook-form";
import AddressForm from "./general/AddressForm";
import PersonalDataForm from "./general/PersonalDataForm";
import Api from "../../../services/Api";
import { postData, updateData, defaultValues } from "./MedicFormInt";
import Stack from '@mui/material/Stack';
import "./form.css";


export default ({ isUpdate }) => {

  const { crm } = isUpdate ? useParams() : '';
  const history = isUpdate ? useNavigate() : '';
  const [id, setId] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { defaultValues }
  });

  const watchEspecialidade = watch("especialidade")
  const watchUf = watch("uf")

  useEffect(() => {

    async function loadData() {
      const response = await Api.get("/medico/" + crm);

      if (response.data.length === 0) {
        history("/")
        return
      }

      setId(response.data.id)
      setValue("nome", response.data.nome);
      setValue("email", response.data.email);
      setValue("telefone", response.data.telefone);
      setValue("crm", response.data.crm);
      setValue("especialidade", response.data.especialidade);
      setValue("logradouro", response.data.endereco.logradouro);
      setValue("numero", response.data.endereco.numero);
      setValue("complemento", response.data.endereco.complemento);
      setValue("bairro", response.data.endereco.bairro);
      setValue("uf", response.data.endereco.uf);
      setValue("cidade", response.data.endereco.cidade);
      setValue("cep", response.data.endereco.cep);

    }

    if (isUpdate) loadData();

  }, [])

  const onSubmit = async (data) => {
    if (!isUpdate) postData(data);
    else updateData(id, data);
  };

  return (
    <>
      <div className="app-container">

        <div className="form-group">
          <PersonalDataForm register={register} errors={errors} isUpdate={isUpdate} />
        </div>

        <div className="form-group">
          <Stack spacing={2}>
            <h2>Profissional</h2>
            <Divider />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Especialidade</InputLabel>
                {watchEspecialidade && (<Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="outlined"
                  className={errors?.especialidade && "input-error"}
                  disabled={isUpdate}
                  value={watch("especialidade")}
                  {...register("especialidade", { validate: (value) => value !== "0" })}
                >
                  <MenuItem value={"0"}>Selecione...</MenuItem>
                  <MenuItem value={"ORTOPEDIA"}>ORTOPEDIA</MenuItem>
                  <MenuItem value={"CARDIOLOGIA"}>CARDIOLOGIA</MenuItem>
                  <MenuItem value={"GINECOLOGIA"}>GINECOLOGIA</MenuItem>
                  <MenuItem value={"DERMATOLOGIA"}>DERMATOLOGIA</MenuItem>
                </Select>)}
              </FormControl>
            </Box>
            {errors?.especialidade?.type === "validate" && (
              <p className="error-message">Especialidade é obrigatório.</p>
            )}

            <Box>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label={isUpdate ? "" : "CRM"}
                  variant="outlined"
                  className={errors?.crm && "input-error"}
                  type="text"
                  placeholder="Digite seu CRM..."
                  disabled={isUpdate}
                  {...register("crm", { required: true })} />
              </FormControl>
            </Box>
            {errors?.crm?.type === "required" && (
              <p className="error-message">CRM é obrigatório.</p>
            )}
          </Stack>

        </div>

        <div className="form-group">
          <AddressForm register={register} errors={errors} isUpdate={isUpdate} watch={watch} watchUf={watchUf} />
        </div>

        <div className="form-group">
          <Stack spacing={2}>
            <h2>Termo de compromisso</h2>
            <div className='checkbox-group'>
              <Checkbox
                defaultChecked
                sx={{
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                }}
                {...register("privacyTerms", {
                  validate: (value) => value === true,
                })}
              />
              <label>Confirmo que as informações fornecidas estão corretas.</label>
            </div>
            {errors?.privacyTerms?.type === "validate" && (
              <p className="error-message">
                Você deve confirmar que as informações fornecidas estão corretas.
              </p>
            )}

            <Fab color="primary" variant="extended" onClick={() => handleSubmit(onSubmit)()}>
              <AddIcon sx={{ mr: 1 }} />
              Salvar
            </Fab>
            <Fab color="primary" variant="extended">
              <CleaningIcon sx={{ mr: 1 }} />
              Limpar campos
            </Fab>
          </Stack>
        </div>
      </div>
    </>
  );
};
