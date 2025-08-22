"use client"

import { getMoviesByGenre } from "@/lib/movie-data"
import { MovieCard } from "@/components/cinevideo"
import Link from "next/link"
import { Search } from "lucide-react"

export default function GenrePage({ params }: { params: { id: string } }) {
  // Obtém o ID do gênero da URL
  const genreId = params.id
  // Busca filmes do gênero selecionado
  const movies = getMoviesByGenre(genreId)

  // Mapeamento de IDs de gênero para nomes em português
  const genreNames: Record<string, string> = {
    acao: "Ação",
    aventura: "Aventura",
    terror: "Terror",
    suspense: "Suspense",
    romance: "Romance",
    comedia: "Comédia",
    drama: "Drama",
  }

  const genreName = genreNames[genreId] || genreId

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Cabeçalho */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <Link href="/">
              <h1 className="text-[#e31010] text-4xl font-bold">CINevídeo</h1>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-full md:w-64 h-10 px-4 bg-[#fff2f2] rounded-none focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    window.location.href = `/?search=${encodeURIComponent(e.currentTarget.value)}`
                  }
                }}
              />
              <button
                className="absolute right-0 top-0 h-10 w-10 bg-[#e36161] flex items-center justify-center"
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Pesquisar"]') as HTMLInputElement
                  if (input && input.value) {
                    window.location.href = `/?search=${encodeURIComponent(input.value)}`
                  }
                }}
              >
                <Search className="text-white w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Seção de filmes do gênero */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <Link href="/homepage" className="text-[#e31010] hover:underline">
            Voltar
          </Link>
          <h2 className="text-[#e31010] text-3xl font-bold">Filmes de {genreName}</h2>
        </div>

        {/* Lista de filmes do gênero ou mensagem se não houver filmes */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-lg">Nenhum filme encontrado neste gênero.</p>
        )}
      </section>
    </div>
  )
}

