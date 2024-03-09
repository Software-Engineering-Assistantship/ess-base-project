import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { LoginFormSchema, LoginFormType } from "../../forms/LoginForm";
import { Link, Navigate } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const Login = () => {
  const { state, prevState, service } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (body) => {
    service.login(body);
    reset();
  };

  useEffect(() => {
    if (
      state.loginRequestStatus !== prevState?.loginRequestStatus &&
      state.loginRequestStatus.isSuccess()
    ) {
      alert("Login realizado com sucesso!");
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-name"
            {...register("login")}
            placeholder="Digite seu login"
            className={styles.formInput}
          />
          {errors.login && (
            <span data-cy="input-name-error" className={styles.formError}>
              {errors.login?.message}
            </span>
          )}
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
  
        <Button data-cy="login" type="submit" disabled={state.loginRequestStatus.isLoading()}>
          {state.loginRequestStatus.isLoading() ? "Logando..." : "LOGIN"}
        </Button>
      </form>
  
      {state.loginRequestStatus.isSuccess() && (
        <Navigate to={`/home`} />
      )}

      {state.loginRequestStatus.isFailure() && (
        <p className={styles.errorMessage}>{state.loginRequestStatus.error.message}</p>
      )}
  
      <Link data-cy="back-to-home" to="/home">
        Voltar para início
      </Link>
    </section>
  );  
};

export default Login;

