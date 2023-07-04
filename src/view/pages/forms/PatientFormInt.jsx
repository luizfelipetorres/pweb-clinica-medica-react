
import Api from "../../../services/Api";
import { toast } from "react-toastify";

export async function postData(data) {
    return await Api.post("/paciente", {
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
};

export async function updateData(id, data) {
    return await Api.put(`/paciente/${id}`, {
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

};

export let defaultValues = {
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