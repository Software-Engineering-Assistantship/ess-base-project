import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const ListUsers = () => {
  const { service, state } = useContext(UserContext);

  useEffect(() => {
    service.getUsers();
  }, [service]);
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Lista de Usuários</h1>
      <div className={styles.listContainer}>
        {state.getUserRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar Usuários!</span>,
          succeeded: (users) => (
            <>
              {users.map((user) => {
                return (
                  <div key={user.id} className={styles.listItem}>
                    <span
                      data-cy={`user-item-${user.login}`}
                      data-testid={`user-item-${user.login}`}
                      data-id={user.id}
                      className={styles.listItemText}
                    >
                      {user.login}
                    </span>
                  </div>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
      <Link to="/create-user" replace>
        CRIAR USUÁRIO
      </Link>
    </section>
  );
};

export default ListUsers;
