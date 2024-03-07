import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { UserUpdateFormSchema, UserUpdateFormType } from "../../forms/UserUpdateForm";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const UpdateUser = () => {
  const { state, prevState, service } = useContext(UserContext);
  const id = window.location.pathname.split("/").pop();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserUpdateFormType>({
    resolver: zodResolver(UserUpdateFormSchema),
  });

  const onSubmit: SubmitHandler<UserUpdateFormType> = async (body) => {
    service.updateUser(body, id ?? '');
    reset();
  };

  useEffect(() => {
    if (
      state.updateUserRequestStatus !== prevState?.updateUserRequestStatus &&
      state.updateUserRequestStatus.isSuccess()
    ) {
      alert("Usuário atualizado com sucesso!");
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Atualização de Usuário</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-name"
            {...register("nome")}
            placeholder="Digite seu novo nome"
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
            data-cy="input-login"
            {...register("login")}
            placeholder="Digite seu novo login"
            className={styles.formInput}
          />
          {errors.login && (
            <span data-cy="input-login-error" className={styles.formError}>
              {errors.login.message}
            </span>
          )}
        </div>
  
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-password"
            type="password"
            {...register("senha")}
            placeholder="Digite sua nova senha"
            className={styles.formInput}
          />
          {errors.senha && (
            <span data-cy="input-password-error" className={styles.formError}>
              {errors.senha.message}
            </span>
          )}
        </div>
  
        <Button data-cy="create" type="submit" disabled={state.updateUserRequestStatus.isLoading()}>
          {state.updateUserRequestStatus.isLoading() ? "Atualizando..." : "Atualizar"}
        </Button>
      </form>
  
      {state.updateUserRequestStatus.isSuccess() && (
        <p className={styles.successMessage}>Usuário atualizado com sucesso!</p>
      )}
  
      {state.updateUserRequestStatus.isFailure() && (
        <p className={styles.errorMessage}>{state.updateUserRequestStatus.error.message}</p>
      )}
  
      <Link data-cy="view-users" to="/users">
        VER USUÁRIOS
      </Link>
    </section>
  );  
};

export default UpdateUser;

