
import Api from "../../../services/Api";
import { toast } from "react-toastify";

export async function postData(data) {
    return await Api.post("/medico", {
        nome: data.nome,
        email: data.email,
        crm: data.crm,
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
            toast.error(error.response.data.detalhes, {
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
    await Api.put(`/medico/${id}`, {
        nome: data.nome,
        email: data.email,
        crm: data.crm,
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
            toast.error(error.response.data.detalhes, {
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
    crm: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: ""
}