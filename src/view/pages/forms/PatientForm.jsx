import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CleaningIcon from "@mui/icons-material/CleaningServices";
import { Fab } from "@mui/material";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from "react-hook-form";
import AddressForm from "./general/AddressForm";
import PersonalDataForm from "./general/PersonalDataForm";
import Api from "../../../services/Api";
import { postData, updateData, defaultValues } from "./PatientFormInt";
import Stack from '@mui/material/Stack';
import "./form.css";


export default ({ isUpdate }) => {

    const { cpf } = isUpdate ? useParams() : '';
    const history = isUpdate ? useNavigate() : '';
    const [id, setId] = useState(0);
    const [uf, setUf] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: { defaultValues }
    });

    useEffect(() => {

        async function loadData() {
            const response = await Api.get("/paciente/" + cpf);

            if (response.data.length === 0) {
                history("/")
                return
            }

            setId(response.data.id)
            setValue("nome", response.data.nome);
            setValue("email", response.data.email);
            setValue("telefone", response.data.telefone);
            setValue("especialidade", response.data.especialidade);
            setValue("cpf", response.data.cpf);
            setValue("logradouro", response.data.endereco.logradouro);
            setValue("numero", response.data.endereco.numero);
            setValue("complemento", response.data.endereco.complemento);
            setValue("bairro", response.data.endereco.bairro);
            setValue("cidade", response.data.endereco.cidade);
            setValue("uf", response.data.endereco.uf);
            setValue("cep", response.data.endereco.cep);
            setUf(response.data.endereco.uf);
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

                    <Box marginTop={2}>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label={isUpdate ? "" : "CPF"}
                                variant="outlined"
                                className={errors?.cpf && "input-error"}
                                type="text"
                                placeholder="Digite seu CPF..."
                                disabled={isUpdate}
                                {...register("cpf", { required: isUpdate ? false : true })} />
                        </FormControl>
                    </Box>
                    {errors?.crm?.type === "required" && (
                        <p className="error-message">CRM é obrigatório.</p>
                    )}
                </div>


                <div className="form-group">
                    <AddressForm register={register} errors={errors} isUpdate={isUpdate} uf={uf}/>
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
