"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, StarOff, Calendar, Award } from "lucide-react"
import type { Movie } from "@/lib/tmdb-service"
import { genreIdToName } from "@/lib/movie-database"

interface MovieDetailsProps {
  movie: Movie
  onToggleFavorite: (id: string) => void
}

export function MovieDetails({ movie, onToggleFavorite }: MovieDetailsProps) {
  // Преобразуем ID жанров в названия
  const genreNames = movie.genre.map((g) => {
    // Если это числовой ID, преобразуем его в название
    if (!isNaN(Number(g))) {
      return genreIdToName(Number(g)) || g
    }
    return g
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl || "/placeholder.svg"}
              alt={movie.title}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(movie.title)}`
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-cream-dark text-burgundy">
              <div className="text-center p-4">
                <p className="text-sm">{movie.title}</p>
              </div>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          className={`w-full mt-4 ${movie.isFavorite ? "bg-burgundy text-cream" : "vintage-button-outline"}`}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {movie.isFavorite ? (
            <>
              <Star className="h-4 w-4 mr-2 fill-cream" /> В избранном
            </>
          ) : (
            <>
              <StarOff className="h-4 w-4 mr-2" /> Добавить в избранное
            </>
          )}
        </Button>
      </div>

      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold text-burgundy mb-2">{movie.title}</h2>
        {movie.originalTitle && movie.originalTitle !== movie.title && (
          <p className="text-sm text-burgundy-light mb-4">{movie.originalTitle}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {genreNames.map((genre, index) => (
            <Badge key={index} variant="outline" className="vintage-badge">
              {genre}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {movie.year && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-burgundy" />
              <span className="text-sm">{movie.year} год</span>
            </div>
          )}

          {movie.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-burgundy fill-burgundy" />
              <span className="text-sm">Рейтинг: {movie.rating.toFixed(1)}/10</span>
            </div>
          )}

          {movie.director && (
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2 text-burgundy" />
              <span className="text-sm">Режиссер: {movie.director}</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-burgundy mb-2">Описание</h3>
          <p className="text-burgundy-dark">{movie.description || "Описание отсутствует"}</p>
        </div>

        {movie.backdropUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-burgundy mb-2">Кадр из фильма</h3>
            <div className="rounded-md overflow-hidden">
              <img
                src={movie.backdropUrl || "/placeholder.svg"}
                alt={`Кадр из фильма ${movie.title}`}
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
