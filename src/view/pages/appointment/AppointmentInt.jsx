import { toast } from "react-toastify";
import Api from "../../../services/Api";

export async function postData(data) {
  return await Api.post("/consulta", {
    medicoCrm: data.medicoCrm,
    pacienteCpf: data.pacienteCpf,
    dataHoraConsulta: data.dataHoraConsulta,
  })
    .then((result) => {
        toast.success("Consulta registrada com sucesso!")
    })
    .catch((error) => {
        toast.error(error.response.data.detalhes)
    });
}
