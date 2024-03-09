import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { UserFormSchema, UserFormType } from "../../forms/UserForm";
import { Link, Navigate } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import InputMask from "react-input-mask";

const CreateUser = () => {
  const { state, prevState, service } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(UserFormSchema),
  });

  const onSubmit: SubmitHandler<UserFormType> = async (body) => {
    service.createUser(body);
    reset();
    setValue("dataNascimento", "");
  };

  useEffect(() => {
    if (
      state.createUserRequestStatus !== prevState?.createUserRequestStatus &&
      state.createUserRequestStatus.isSuccess()
    ) {
      alert("Usuário criado com sucesso! Você será rediriceionado para a página de login.");
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Cadastro de Usuário</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-name"
            {...register("nome")}
            placeholder="Digite seu nome"
            className={styles.formInput}
          />
          {errors.nome && (
            <span data-cy="input-name-error" className={styles.formError}>
              {errors.nome?.message}
            </span>
          )}
        </div>
  
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-cpf"
            {...register("cpf")}
            placeholder="Digite seu CPF"
            className={styles.formInput}
          />
          {errors.cpf && (
            <span data-cy="input-cpf-error" className={styles.formError}>
              {errors.cpf.message}
            </span>
          )}
        </div>
  
        <div className={styles.formInputContainer}>
          <InputMask
            mask="99/99/9999"
            data-cy="input-birthdate"
            {...register("dataNascimento")}
            placeholder="Digite sua data de nascimento"
            className={styles.formInput}
          />
          {errors.dataNascimento && (
            <span data-cy="input-birthdate-error" className={styles.formError}>
              {errors.dataNascimento.message}
            </span>
          )}
        </div>
  
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-email"
            {...register("email")}
            placeholder="Digite seu email"
            className={styles.formInput}
          />
          {errors.email && (
            <span data-cy="input-email-error" className={styles.formError}>
              {errors.email.message}
            </span>
          )}
        </div>
  
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-login"
            {...register("login")}
            placeholder="Digite seu login"
            className={styles.formInput}
          />
        </div>
  
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-password"
            type="password"
            {...register("senha")}
            placeholder="Digite sua senha"
            className={styles.formInput}
          />
          {errors.senha && (
            <span data-cy="input-password-error" className={styles.formError}>
              {errors.senha.message}
            </span>
          )}
        </div>
  
        <Button data-cy="create" type="submit" disabled={state.createUserRequestStatus.isLoading()}>
          {state.createUserRequestStatus.isLoading() ? "Criando..." : "CRIAR"}
        </Button>
      </form>
  
      {state.createUserRequestStatus.isSuccess() && (
        <><p className={styles.successMessage}>Usuário criado com sucesso!</p><Navigate to="/login" replace /></>
      )}
  
      {state.createUserRequestStatus.isFailure() && (
        <p className={styles.errorMessage}>{state.createUserRequestStatus.error.message}</p>
      )}
  
      <Link data-cy="view-users" to="/home">
        Voltar para início
      </Link>
    </section>
  );  
};

export default CreateUser;

