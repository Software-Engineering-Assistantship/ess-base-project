//import React from "react";
import images from "../../../../shared/assets/images/";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { LoginContext } from "../../context/LoginContext";
import { useContext} from "react";

const HomePage = () => {
  const { state } = useContext(LoginContext);
 
  const handleLogout = () => {
    alert ("Usuário deslogado com sucesso!");
    window.location.reload(); // Marcar que a página deve ser recarregada
  }
  
  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <img src={images.logo} alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.header}>
        <h1 className={styles.title}>Livraria Júlio Verne</h1>
        <p className={styles.subtitle}>Seu universo de leitura!</p>
      </div>
      <div className={styles.buttonContainer}>
        {state.isLogged ? (
          <>
            <Link to={`/profile/${state.userId}`} className={styles.linkButton}>
              Perfil
            </Link>
            <Link to={`/logout/${state.userId}`} className={styles.linkButton} onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.linkButton}>
              Login
            </Link>
            <Link to="/create-user" className={styles.linkButton}>
              Cadastro
            </Link>
          </>
        )}
      </div>
      <div className={styles.productSection}>
        <h2 className={styles.productTitle}>Produtos em destaque</h2>
        <div className={styles.productContainer}>
            <div className={styles.productBox}>
                <img src={images.livro1} alt="Produto 1" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>Viagem ao Centro da Terra</h3>
                <p className={styles.productPrice}>R$ 62,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro2} alt="Produto 2" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>20 Mil Léguas Submarinas</h3>
                <p className={styles.productPrice}>R$ 41,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro3} alt="Produto 3" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>A Ilha Misteriosa</h3>
                <p className={styles.productPrice}>R$ 32,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro4} alt="Produto 4" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>A Volta Ao Mundo Em 80 Dias</h3>
                <p className={styles.productPrice}>R$ 48,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro5} alt="Produto 5" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>Da Terra á Lua</h3>
                <p className={styles.productPrice}>R$ 32,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro6} alt="Produto 6" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>Robur, O Conquistador</h3>
                <p className={styles.productPrice}>R$ 27,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro7} alt="Produto 7" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>O Castelo Dos Cárpatos</h3>
                <p className={styles.productPrice}>R$ 29,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro8} alt="Produto 8" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>O Raio Verde</h3>
                <p className={styles.productPrice}>R$ 24,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro9} alt="Produto 9" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>O Senhor Do Mundo</h3>
                <p className={styles.productPrice}>R$ 46,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro10} alt="Produto 10" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>Cinco Semanas Em Um Balão</h3>
                <p className={styles.productPrice}>R$ 37,00</p>
                <button className={styles.productButton}>Comprar</button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
