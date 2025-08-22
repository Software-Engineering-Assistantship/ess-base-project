// Dados mockados dos filmes
export const movieData = [
  {
    id: "black-panther",
    title: "Pantera Negra",
    description:
      "T'Challa, herdeiro do reino secreto de Wakanda, deve dar um passo à frente para liderar seu povo e deve enfrentar um velho inimigo em um conflito que coloca o destino de Wakanda e do mundo em risco.",
    genres: ["acao", "aventura"],
    year: 2018,
    duration: "2h 14m",
    // AQUI VOCÊ PODE SUBSTITUIR O PLACEHOLDER PELA URL DA IMAGEM DO FILME
    posterUrl: "/film_banners/poster-pantera-negra-a-3a2d0bc1.jpg",
    rating: 4.5,
  },
  {
    id: "alien",
    title: "Alien",
    description:
      "A tripulação do navio comercial Nostromo é despertada de seu sono criogênico para investigar um sinal de socorro de um planeta desconhecido.",
    genres: ["terror", "suspense", "acao"],
    year: 1979,
    duration: "1h 57m",
    // AQUI VOCÊ PODE SUBSTITUIR O PLACEHOLDER PELA URL DA IMAGEM DO FILME
    posterUrl: "/film_banners/jch6s074ibsa1.webp",
    rating: 4.8,
  },
  {
    id: "mad-max",
    title: "Mad Max: Estrada da Fúria",
    description:
      "Em um mundo pós-apocalíptico, Max se junta a Furiosa para fugir de um tirano e seu exército em uma corrida explosiva pelo deserto.",
    genres: ["acao", "aventura"],
    year: 2015,
    duration: "2h",
    posterUrl: "/film_banners/mad_max.jpg",
    rating: 4.7,
  },
  {
    id: "jumanji",
    title: "Jumanji: Bem-Vindo à Selva",
    description:
      "Quatro adolescentes são transportados para um jogo de videogame e devem trabalhar juntos para sobreviver e escapar.",
    genres: ["aventura", "comedia"],
    year: 2017,
    duration: "1h 59m",
    posterUrl: "/film_banners/jumanji.webp",
    rating: 4.3,
  },
  {
    id: "it",
    title: "It: A Coisa",
    description:
      "Um grupo de crianças enfrenta seus piores medos ao confrontar um palhaço demoníaco chamado Pennywise.",
    genres: ["terror", "suspense"],
    year: 2017,
    duration: "2h 15m",
    posterUrl: "/film_banners/it.jpg",
    rating: 4.6,
  },
  {
    id: "a-quiet-place",
    title: "Um Lugar Silencioso",
    description:
      "Uma família deve viver em silêncio absoluto para evitar criaturas mortais que caçam pelo som.",
    genres: ["terror", "suspense"],
    year: 2018,
    duration: "1h 30m",
    posterUrl: "/film_banners/um lugar silencioso.jpg",
    rating: 4.5,
  },
  {
    id: "the-notebook",
    title: "Diário de uma Paixão",
    description:
      "Um casal apaixonado enfrenta desafios e provações ao longo dos anos em uma história de amor atemporal.",
    genres: ["romance"],
    year: 2004,
    duration: "2h 3m",
    posterUrl: "/film_banners/The_Notebook_pôster.jpg",
    rating: 4.6,
  },
  {
    id: "la-la-land",
    title: "La La Land",
    description:
      "Um pianista de jazz e uma aspirante a atriz se apaixonam enquanto perseguem seus sonhos em Los Angeles.",
    genres: ["romance", "comedia"],
    year: 2016,
    duration: "2h 8m",
    posterUrl: "/film_banners/la la land.jpg",
    rating: 4.7,
  },
  {
    id: "superbad",
    title: "Superbad",
    description:
      "Dois amigos inseparáveis tentam aproveitar ao máximo sua última festa antes da formatura do ensino médio.",
    genres: ["comedia"],
    year: 2007,
    duration: "1h 53m",
    posterUrl: "/film_banners/superbad.webp",
    rating: 4.4,
  },
  {
    id: "the-hangover",
    title: "Se Beber, Não Case!",
    description:
      "Três amigos acordam em Las Vegas sem memória da noite anterior e precisam encontrar o noivo desaparecido antes do casamento.",
    genres: ["comedia"],
    year: 2009,
    duration: "1h 40m",
    posterUrl: "/film_banners/se beber nao case.jpg",
    rating: 4.3,
  },
  {
    id: "howls-moving-castle",
    title: "O Castelo Animado",
    description:
      "Sophie, uma jovem transformada em uma idosa por uma bruxa malvada, encontra abrigo no misterioso castelo de Howl, um mago excêntrico com segredos mágicos.",
    genres: ["aventura", "fantasia", "romance"],
    year: 2004,
    duration: "1h 59m",
    posterUrl: "/film_banners/howlmovingcastle-TicketingPoster_1000x1480_jpg.jpg",
    rating: 4.8,
  }
]

// Função para filtrar filmes por gênero
export function getMoviesByGenre(genreId: string) {
  return movieData.filter((movie) => movie.genres.includes(genreId))
}

// Função para buscar um filme pelo ID
export function getMovieById(id: string) {
  return movieData.find((movie) => movie.id === id)
}