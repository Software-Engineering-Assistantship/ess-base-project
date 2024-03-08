import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { UserUpdateFormSchema, UserUpdateFormType } from "../../forms/UserUpdateForm";
import { Navigate, Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const UpdateUser = () => {
  const { state, prevState, service } = useContext(UserContext);
  const id = window.location.pathname.split("/").pop();
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    service.updateUser(body, id ?? '').then(() => {
      setIsUpdateSuccess(true);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
    reset();
  };

  useEffect(() => {
    if (state.updateUserRequestStatus !== prevState?.updateUserRequestStatus) {
      if (state.updateUserRequestStatus.isSuccess() && !isUpdateSuccess) {
        alert("Usuário atualizado com sucesso!");
        setIsUpdateSuccess(true);
      }
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
          {isLoading ? "Atualizando..." : "Atualizar"}
        </Button>

        <Button data-cy="cancel" type="button">
          <Link to={`/profile/${id}`} className={styles.linkButton}>Cancelar</Link>
        </Button>
      </form>
  
      {isUpdateSuccess && (
        <Navigate to={`/profile/${id}`} />
      )}
  
      {state.updateUserRequestStatus.isFailure() && (
        <p className={styles.errorMessage}>{state.updateUserRequestStatus.error.message}</p>
      )}
    </section>
  );  
};

export default UpdateUser;

