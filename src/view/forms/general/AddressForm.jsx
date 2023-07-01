import '../form.css';

export default ({register, errors}) => {

  return (
    <>
      <div className="form-group">
        <label>Logradouro</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Informe logradouro"
          {...register("public-place", { required: true })}
        />
        {errors?.publicPlace?.type === "required" && (
          <p className="error-message">Logradouro é obrigatório.</p>
        )}
      </div>
      
      <div>
        <div className="form-group">
          <label>Número</label>
          <input
            className={errors?.name && "input-error"}
            type="text"
            placeholder="Informe número"
            {...register("number", { required: true })}
          />
          {errors?.number?.type === "required" && (
            <p className="error-message">Número é obrigatório.</p>
          )}
        </div>

        <div className="form-group">
          <label>Complemento</label>
          <input
            className={errors?.name && "input-error"}
            type="text"
            placeholder="Informe complemento"
            {...register("complement", { required: true })}
          />
          {errors?.complement?.type === "required" && (
            <p className="error-message">Complemento é obrigatório.</p>
          )}
        </div>
      </div>
      
      <div className="form-group">
        <label>Cidade</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Informe cidade"
          {...register("city", { required: true })}
        />
        {errors?.city?.type === "required" && (
          <p className="error-message">Cidade é obrigatório.</p>
        )}
      </div>
      
      <div>
        <div className="form-group">
          <label>UF</label>
          <select
            className={errors?.specialty && "input-error"}
            defaultValue="0"
            {...register("state", { validate: (value) => value !== "0" })}
          >
            <option value="0">Selecione um estado...</option>
            <option value="ortopedia">BA</option>
            <option value="cardiologia">SP</option>
            <option value="ginecologia">RJ</option>
            <option value="dermatologia">MG</option>
          </select>

          {errors?.state?.type === "validate" && (
            <p className="error-message">UF é obrigatório.</p>
          )}
        </div>

        <div className="form-group">
          <label>CEP</label>
          <input
            className={errors?.name && "input-error"}
            type="text"
            placeholder="Informe CEP"
            {...register("zip-code", { required: true })}
          />
          {errors?.zipCode?.type === "required" && (
            <p className="error-message">CEP é obrigatório.</p>
          )}
        </div>
      </div>
    </>
  );
};