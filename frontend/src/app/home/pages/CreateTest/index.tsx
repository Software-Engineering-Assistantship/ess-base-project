import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../context/HomeContext";
import { TestFormSchema, TestFormType } from "../../forms/TestForm";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const CreateTest = () => {
  const { state, prevState, service } = useContext(HomeContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestFormType>({
    resolver: zodResolver(TestFormSchema),
  });

  const onSubmit: SubmitHandler<TestFormType> = async (body) => {
    service.createTest(body);
    reset();
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
      <h1 className={styles.title}>Crie um test</h1>
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
          CRIAR
        </Button>

        <Link data-cy="view-tests" to="/tests">
          VER TESTS
        </Link>
      </form>
    </section>
  );
};

export default CreateTest;
