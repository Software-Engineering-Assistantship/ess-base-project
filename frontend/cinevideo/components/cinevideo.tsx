"use client"

import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { movieData } from "@/lib/movie-data"
import { getMovieById } from "@/lib/movie-data"

export default function CineVideo() {
  // Estado para controlar a exibição do menu de gêneros
  const [showGenres, setShowGenres] = useState(false)
  const [topTenMovies, setTopTenMovies] = useState<string[]>([]) // IDs dos filmes do top 10
  const [recomendationsMovies, setRecomendationsMovies] = useState<string[]>([]) // IDs dos filmes da lista de recomendações
  const [movieDetails, setMovieDetails] = useState<any[]>([]) // Detalhes dos filmes
  const [movieDetailsRec, setMovieDetailsRec] = useState<any[]>([]) // Detalhes dos filmes
  // Estado para o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState("")
  // Estado para controlar se a pesquisa foi submetida
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {

      // Verificar se há um termo de pesquisa na URL ao carregar a página
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const searchParam = urlParams.get("search")
      if (searchParam) {
        setSearchTerm(searchParam)
        setIsSearching(true)
      }
    }


    const fetchTop10 = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/top10/Sistema`)
        if (!response.ok) {
          throw new Error("Erro ao buscar filmes do top 10")
        }
        const data = await response.json()
        setTopTenMovies(data) // Atualiza a lista de IDs dos filmes curtidos
      } catch (error) {
        console.error("Erro ao buscar filmes do top 10:", error)
      }
    }

    const fetchRecomendations = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/Sistema/series`)
        if (!response.ok) {
          throw new Error("Erro ao buscar filmes recomendados")
        }
        const NewData = await response.json()
        setRecomendationsMovies(NewData) // Atualiza a lista de IDs dos filmes curtidos
      } catch (error) {
        console.error("Erro ao buscar filmes recomendados:", error)
      }
    }

    fetchTop10()
    fetchRecomendations()
  }, [])

  useEffect(() => {
      const fetchMovieDetails = async () => {
        const movies = await Promise.all(
          topTenMovies.map(async (movieId) => {
            const movie = await getMovieById(movieId);
            return movie;
          })
        );
        setMovieDetails(movies);
      };

      const fetchMovieDetailsRec = async () => {
        const movies = await Promise.all(
          recomendationsMovies.map(async (movieId) => {
            const movie = await getMovieById(movieId);
            return movie;
          })
        );
        setMovieDetailsRec(movies);
      };
  


      if (topTenMovies.length > 0) {
        fetchMovieDetails();
      }

      
      if (recomendationsMovies.length > 0) {
        fetchMovieDetailsRec();
      }


    }, [topTenMovies, recomendationsMovies]);

  // Lista de gêneros disponíveis
  const genres = [
    { id: "acao", name: "Ação" },
    { id: "aventura", name: "Aventura" },
    { id: "terror", name: "Terror" },
    { id: "suspense", name: "Suspense" },
    { id: "romance", name: "Romance" },
    { id: "comedia", name: "Comédia" },
  ]

  // Função para filtrar filmes com base no termo de pesquisa
  const searchResults = movieData.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Seleciona os primeiros 4 filmes para exibir como Top 10 e Recomendados
  const top10Movies = movieData.slice(0, 4)
  const recommendedMovies = movieData.slice(0, 4)

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Cabeçalho */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <Link href="/">
              <h1 className="text-[#e31010] text-4xl font-bold">CINevídeo</h1>
            </Link>
            <h2 className="text-[#e31010] text-3xl font-bold">Top 10</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Barra de pesquisa */}
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-full md:w-64 h-10 px-4 bg-[#fff2f2] rounded-none focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsSearching(true)
                  }
                }}
              />
              <button
                className="absolute right-0 top-0 h-10 w-10 bg-[#e36161] flex items-center justify-center"
                onClick={() => setIsSearching(true)}
              >
                <Search className="text-white w-5 h-5" />
              </button>
            </div>

            {/* Botões de navegação */}
            <div className="flex flex-col gap-2">
              <div className="relative">
                {/* Botão de gênero com dropdown */}
                <button className="bg-[#e36161] text-white py-2 px-4 w-full" onClick={() => setShowGenres(!showGenres)}>
                  Gênero
                </button>

                {/* Menu dropdown de gêneros */}
                {showGenres && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-[#e36161] shadow-lg">
                    {genres.map((genre) => (
                      <Link
                        key={genre.id}
                        href={`/genero/${genre.id}`}
                        className="block px-4 py-2 text-[#e31010] hover:bg-[#fff2f2]"
                        onClick={() => setShowGenres(false)}
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/likedSeries">
                <button className="bg-[#e36161] text-white py-2 px-4 w-full">
                  Séries Curtidas
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal - Resultados da pesquisa ou seções normais */}
      {isSearching && searchTerm ? (
        <section>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => {
                setIsSearching(false)
                setSearchTerm("")
              }}
              className="text-[#e31010] hover:underline flex items-center"
            >
              <span>Voltar</span>
            </button>
            <h2 className="text-[#e31010] text-3xl font-bold">Resultados para "{searchTerm}"</h2>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-lg">Nenhum filme encontrado para "{searchTerm}".</p>
          )}
        </section>
      ) : (
        <>
          {/* Seção Top 10 Filmes */}
          <section className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {movieDetails.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* Seção Filmes Recomendados */}
          <section>
            <h2 className="text-[#e31010] text-3xl font-bold mb-6">Recomendados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {movieDetailsRec.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

// Componente de card de filme reutilizável
export function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/filme/${movie.id}`}>
      <div className="bg-[#d9d9d9] p-2 cursor-pointer transition-transform hover:scale-105">
        <div className="aspect-[2/3] relative">
          {/* AQUI É ONDE VOCÊ COLOCA AS IMAGENS DOS FILMES */}
          {/* Substitua o valor de 'src' pelo caminho da sua imagem */}
          <Image
            src={movie.posterUrl || "/placeholder.svg"}
            alt={`${movie.title} movie poster`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  )
}