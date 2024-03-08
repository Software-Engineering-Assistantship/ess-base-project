import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const UserProfile = () => {
  const { service, state } = useContext(UserContext);
  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    service.getUser(id || "").then;
  }, [service]);
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Perfil</h1>
      <div className={styles.listContainer}>
        {state.getUserRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar usuário!</span>,
          succeeded: (user) => (
            <>
              <p>
                <strong>Nome:</strong> {user[0].nome}
              </p>
              <p>
                <strong>Email:</strong> {user[0].email}
              </p>
              <p>
                <strong>Login:</strong> {user[0].login}
              </p>
              <p>
                <strong>CPF:</strong> {user[0].cpf}
              </p>
              <p>
                <strong>Data de Nascimento:</strong> {user[0].dataNascimento}
              </p>
            </>
          ),
        })}
      </div>
      <br />
      <Link to={`/update-user/${id}`} className={styles.linkButton}>
        <Button type="button">Atualizar Usuário</Button>
      </Link>
      
      
      <Link to="/home" className={styles.linkButton}>
        <Button type="button">Voltar para o início</Button> 
      </Link>
  
    </section>
  );
};

export default UserProfile;
