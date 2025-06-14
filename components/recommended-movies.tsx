"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Film } from "lucide-react"
import { movieService } from "@/lib/movie-service"
import type { Movie } from "@/app/page"

interface RecommendedMoviesProps {
  onSelectMovie: (movie: Movie) => void
}

export function RecommendedMovies({ onSelectMovie }: RecommendedMoviesProps) {
  const [category, setCategory] = useState<string>("popular")
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Загружаем рекомендуемые фильмы при изменении категории
  useEffect(() => {
    const loadRecommendedMovies = async () => {
      setIsLoading(true)
      try {
        const recommendedMovies = await movieService.getRecommendedMovies(category, 10)
        setMovies(recommendedMovies)
      } catch (error) {
        console.error("Ошибка при загрузке рекомендуемых фильмов:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRecommendedMovies()
  }, [category])

  return (
    <div className="recommended-movies">
      <h3 className="text-center text-lg font-medium mb-4 text-burgundy">Рекомендуемые фильмы</h3>

      <Tabs defaultValue="popular" className="mb-4" onValueChange={(value) => setCategory(value)}>
        <TabsList className="vintage-tabs-small w-full">
          <TabsTrigger value="popular" className="vintage-tab-small">
            Популярные
          </TabsTrigger>
          <TabsTrigger value="top_rated" className="vintage-tab-small">
            Высокий рейтинг
          </TabsTrigger>
          <TabsTrigger value="classics" className="vintage-tab-small">
            Классика
          </TabsTrigger>
          <TabsTrigger value="recent" className="vintage-tab-small">
            Новинки
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-burgundy" />
          <p className="mt-2">Загрузка рекомендаций...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-8 text-burgundy">
          <p>Рекомендации не найдены</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="search-result-item flex gap-3 p-2 hover:bg-cream-dark cursor-pointer rounded-md"
              onClick={() => onSelectMovie(movie)}
            >
              <div className="w-12 h-16 bg-cream-dark flex-shrink-0 overflow-hidden">
                {movie.posterUrl ? (
                  <img
                    src={movie.posterUrl || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=64&width=48&text=${encodeURIComponent(movie.title)}`
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-cream-dark text-burgundy">
                    <Film className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium">{movie.title}</h4>
                <p className="text-xs text-burgundy">{movie.year || "Неизвестно"}</p>
                <p className="text-xs line-clamp-2 text-burgundy-light mt-1">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
