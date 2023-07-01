import React from "react";
import { isEmail, isMobilePhone } from "validator";

import "../form.css";

export default ({ register, errors }) => {
  return (
    <>
      <div className="form-group">
        <h2>Dados pessoais</h2>
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
          <p className="error-message">Email inválido.</p>
        )}
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <input
          className={errors?.email && "input-error"}
          type="tel"
          placeholder="Seu telefone"
          {...register("telephone", {
            required: true,
            validate: (value) => isMobilePhone(value, 'pt-BR')
          })}
        />
        {errors?.telephone?.type === "required" && (
          <p className="error-message">Telefone é obrigatório.</p>
        )}
        {errors?.telephone?.type === "validate" && (
          <p className="error-message">Telefone inválido</p>
        )}
        
      </div>
    </>
  );
};
