import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import AddressForm from "../general/AddressForm";
import "../form.css";
import Button from "../../../components/Button";
import Footer from "../../layout/Footer";
import { toast } from "react-toastify";

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
    <div className="app-container">
      <div className="form-group">
        <h2>Profissional</h2>
      </div>

      <div className="form-group">
        <label>Nome completo</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome completo"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && (
          <p className="error-message">Nome completo é obrigatório.</p>
        )}
      </div>

      <div>
        <div className="form-group">
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
        </div>

        <div className="form-group">
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
      </div>

      <div className="form-group">
        <h2>Contato</h2>
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", {
            required: true,
            validate: (value) => isEmail(value),
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="error-message">Email é obrigatório.</p>
        )}

        {errors?.email?.type === "validate" && (
          <p className="error-message">Email é válido.</p>
        )}
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu telefone"
          {...register("telephone", {
            required: true,
          })}
        />
        {errors?.telephone?.type === "required" && (
          <p className="error-message">Telefone é obrigatório.</p>
        )}
      </div>

      <div className="form-group">
        <h2>Endereço</h2>
      </div>

      <AddressForm register={register} errors={errors} />

      <div className="form-group">
        <h2>Termo de compromisso</h2>
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
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
      </div>

      <div className="form-group">
        <Button text="Salvar" onClick={() => handleSubmit(onSubmit)()} />
      </div>

      <div className="form-group">
        <Button text="Cancelar" onClick={() => toast.info("Cancelado")} />
      </div>
      <Footer />
    </div>
  );
};
