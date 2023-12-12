import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { HomeContext } from "../../context/HomeContext";
import { Link } from "react-router-dom";

const ListTests = () => {
  const { service, state } = useContext(HomeContext);

  useEffect(() => {
    service.getTests();
  }, [service]);
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>List Tests</h1>
      <div className={styles.listContainer}>
        {state.getTestsRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar tests!</span>,
          succeeded: (tests) => (
            <>
              {tests.map((test) => {
                return (
                  <div key={test.id} className={styles.listItem}>
                    <span
                      data-cy={`test-item-${test.name}`}
                      className={styles.listItemText}
                    >
                      {test.name}
                    </span>
                  </div>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
      <Link to="/create-test" replace>
        CRIAR TEST
      </Link>
    </section>
  );
};

export default ListTests;
