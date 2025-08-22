import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeContext } from "../../context/HomeContext";
import { TestFormSchema } from "../../forms/TestForm";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import { curtir } from "../../../../shared/services/likedSeries"

const userid = "Ykaro";
const CreateTest = () => {
  const { state, prevState, service } = useContext(HomeContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TestFormSchema),
  });

  const onSubmit = async (body) => {
    curtir(userid, body.name);
  };

  useEffect(() => {
    if (
      state.createTestRequestStatus !== prevState?.createTestRequestStatus &&
      state.createTestRequestStatus.isSuccess()
    ) {
      alert("Teste criado com sucesso!");
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Series</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-name"
            {...register("name")}
            placeholder="Digite o nome"
            className={styles.formInput}
          />
          {errors.name && (
            <span data-cy="input-name-error" className={styles.formError}>
              {errors.name.message}
            </span>
          )}
        </div>

        <Button data-cy="create" type="submit">
          CURTIR
        </Button>

        <Link to="/likedSeries">
          VER SÉRIES CURTIDAS
        </Link>
      </form>
    </section>
  );
};

export default CreateTest;
