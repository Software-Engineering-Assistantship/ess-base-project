"use client";

import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CineVideo() {
  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-[#e31010] text-4xl font-bold">CINevídeo</h1>
            <h2 className="text-[#e31010] text-3xl font-bold">Top 10</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-full md:w-64 h-10 px-4 bg-[#fff2f2] rounded-none focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-10 w-10 bg-[#e36161] flex items-center justify-center">
                <Search className="text-white w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button className="bg-[#e36161] text-white py-2 px-4 w-full">Gênero</button>
              <Link href="/likedSeries">
                <button className="bg-[#e36161] text-white py-2 px-4 w-full">
                  Séries Curtidas
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Top 10 Movies */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <MovieCard imageUrl="/placeholder.svg?height=300&width=200" alt="Black Panther movie poster" />
          <MovieCard imageUrl="/placeholder.svg?height=300&width=200" alt="Alien movie poster" />
          <MovieCard imageUrl="/placeholder.svg?height=300&width=200" alt="Moonlight movie poster" />
          <MovieCard imageUrl="/placeholder.svg?height=300&width=200" alt="Back to the Future movie poster" />
        </div>
      </section>

      {/* Recommended Movies */}
      <section>
        <h2 className="text-[#e31010] text-3xl font-bold mb-6">Recomendados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <MovieCard imageUrl="/placeholder.svg?height=300&width=200" alt="Black Panther movie poster" />
          <MovieCard imageUrl="/placeholder.svg?height=300&width=200" alt="Alien movie poster" />
          <MovieCard imageUrl="/placeholder.svg?height=300&width=200" alt="Moonlight movie poster" />
          <MovieCard imageUrl="/placeholder.svg?height=300&width=200" alt="Back to the Future movie poster" />
        </div>
      </section>
    </div>
  )
}

function MovieCard({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  return (
    <div className="bg-[#d9d9d9] p-2">
      <div className="aspect-[2/3] relative">
        <Image src={imageUrl || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </div>
    </div>
  )
}

