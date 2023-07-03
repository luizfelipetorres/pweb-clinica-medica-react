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
import { toast } from "react-toastify";
import "./form.css";


export default ({ isUpdate }) => {

    const { cpf } = isUpdate ? useParams() : '';
    const history = isUpdate ? useNavigate() : '';
    const [id, setId] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            especialidade: "",
            cpf: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: ""
        }
    });

    useEffect(() => {

        async function loadFilme() {
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
        }

        if (isUpdate) loadFilme();

    }, [])

    const onSubmit = async (data) => {
        if (!isUpdate) {
            await Api.post("/paciente", {
                nome: data.nome,
                email: data.email,
                cpf: data.cpf,
                especialidade: data.especialidade,
                telefone: data.telefone,
                endereco: {
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cep: data.cep,
                    cidade: data.cidade,
                    uf: data.uf,
                    numero: data.numero,
                    complemento: data.complemento
                }
            })
                .then(function (response) {
                    toast.success('Cadastro de ' + response.data.nome + ' realizado com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(function (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
        } else {
            await Api.put(`/paciente/${id}`, {
                nome: data.nome,
                email: data.email,
                cpf: data.cpf,
                especialidade: data.especialidade,
                telefone: data.telefone,
                endereco: {
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cep: data.cep,
                    cidade: data.cidade,
                    uf: data.uf,
                    numero: data.numero,
                    complemento: data.complemento
                }
            })
                .then(function (response) {
                    toast.success('Atualização de ' + response.data.nome + ' foi efetuada com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(function (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
        }
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
                    <AddressForm register={register} errors={errors} isUpdate={isUpdate} />
                </div>

                <div className="form-group">
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
                </div>
            </div>
        </>
    );
};
