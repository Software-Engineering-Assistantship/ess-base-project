import { useEffect, useState } from "react";
import { getSeriesCurtidas, descurtir } from "../../../../shared/services/likedSeries"; // Supondo que a função está num arquivo separado
import { Navigate, useParams, useNavigate } from "react-router-dom";

const LikedSeries = () => {
  const userid = "Ykaro"; // Aqui você pode pegar do useParams ou de alguma outra fonte
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeriesCurtidas = async () => {
      try {
        const data = await getSeriesCurtidas(userid);

        // Verifica se os dados têm a estrutura esperada e pega as séries
        const seriesCurtidas = data.length > 0 ? data[0]["Séries Curtidas"] : [];
        setSeries(seriesCurtidas); // Atualiza o estado com o array de séries
      } catch (err) {
        setError("Erro ao carregar séries curtidas");
      } finally {
        setLoading(false);
      }
    };

    if (userid) {
      fetchSeriesCurtidas();
    }
  }, [userid]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  // Função para lidar com o clique do botão "descurtir"
  const handleDescurtir = async (serie) => {
    try {
      await descurtir(userid, serie); // Envia o nome da série ao backend
      // Atualiza a lista removendo a série
      setSeries((prevSeries) => prevSeries.filter((s) => s !== serie));
    } catch (err) {
      console.log(err);
      setError("Erro ao descurtir a série");
    }
  };

  const handleHome = () => {
    navigate('/create-test');
  };

  return (
    <div>
      <h2>Séries Curtidas</h2>
      <ul>
        {series.map((serie, index) => (
          <li key={index}>
            {serie} 
            <button onClick={() => handleDescurtir(serie)}>Descurtir</button> {/* Botão "Descurtir" */}
          </li>
        ))}
        <button onClick={handleHome}>Home</button>
      </ul>
    </div>
  );
};

export default LikedSeries;
