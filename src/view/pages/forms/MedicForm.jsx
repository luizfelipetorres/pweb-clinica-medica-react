import AddIcon from "@mui/icons-material/Add";
import CleaningIcon from "@mui/icons-material/CleaningServices";
import { Box, Fab } from "@mui/material";
import { useForm } from "react-hook-form";
import "./form.css";
import AddressForm from "./general/AddressForm";
import PersonalDataForm from "./general/PersonalDataForm";

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <div className="app-container">
        <PersonalDataForm register={register} errors={errors} />

        <div className="form-group">
          <h2>Profissional</h2>
          <label>Especialidade</label>
          <select
            className={errors?.specialty && "input-error"}
            defaultValue="0"
            {...register("specialty", { validate: (value) => value !== "0" })}
          >
            <option value="0">Selecione uma especialidade...</option>
            <option value="ortopedia">Ortopedia</option>
            <option value="cardiologia">Cardiologia</option>
            <option value="ginecologia">Ginecologia</option>
            <option value="dermatologia">Dermatologia</option>
          </select>

          {errors?.specialty?.type === "validate" && (
            <p className="error-message">Especialidade é obrigatório.</p>
          )}

          <label>CRM</label>
          <input
            className={errors?.name && "input-error"}
            type="text"
            placeholder="Seu CRM"
            {...register("crm", { required: true })}
          />
          {errors?.CRM?.type === "required" && (
            <p className="error-message">CRM é obrigatório.</p>
          )}
        </div>

        <AddressForm register={register} errors={errors} />

        <div className="form-group">
          <h2>Termo de compromisso</h2>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="privacy-policy"
              {...register("privacyTerms", {
                validate: (value) => value === true,
              })}
            />
            <label>
              Confirmo que as informações fornecidas estão corretas.
            </label>
          </div>

          {errors?.privacyTerms?.type === "validate" && (
            <p className="error-message">
              Você deve confirmar que as informações fornecidas estão corretas.
            </p>
          )}
          <Fab color="primary" variant="extended">
            <AddIcon sx={{ mr: 1 }} />
            Cadastrar novo médico
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
