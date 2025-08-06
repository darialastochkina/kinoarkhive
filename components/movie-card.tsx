"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, CheckSquare, Plus, X } from "lucide-react"
import type { Movie } from "@/lib/tmdb-service"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MovieCardProps {
  movie: Movie
  onToggleWatchlist: (id: string) => void
  onMarkAsWatched: (movie: Movie, rating?: number, comment?: string) => void
  onRemoveFromWatched: (movieId: string) => void
  onLoadDetails?: (tmdbId: number, mediaType: "movie" | "tv") => Promise<Movie | null>
}

export function MovieCard({ 
  movie, 
  onToggleWatchlist, 
  onMarkAsWatched, 
  onRemoveFromWatched, 
  onLoadDetails 
}: MovieCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [detailedMovie, setDetailedMovie] = useState<Movie | null>(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)

  const handleShowDetails = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setShowDetails(true)

    if (onLoadDetails && !detailedMovie && movie.tmdbId) {
      setIsLoadingDetails(true)
      try {
        const details = await onLoadDetails(movie.tmdbId, movie.mediaType)
        if (details) {
          setDetailedMovie(details)
        }
      } catch (error) {
        console.error("Ошибка загрузки деталей:", error)
      } finally {
        setIsLoadingDetails(false)
      }
    }
  }

  // Обработчик для "Посмотрю позже"
  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleWatchlist(movie.id)
  }
  
  // Обработчик для "Просмотрено" - открываем диалог оценки
  const handleWatchedClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (movie.isWatched) {
      // Удаляем из просмотренных
      onRemoveFromWatched(movie.id)
    } else {
      // Открываем диалог для оценки
      setShowRatingDialog(true)
      setSelectedRating(movie.userRating || 0)
    }
  }
  
  // Сохранение оценки
  const handleSaveRating = () => {
    onMarkAsWatched(movie, selectedRating)
    setShowRatingDialog(false)
  }

  const movieToShow = detailedMovie || movie

  return (
    <>
      {/* УЛУЧШЕННАЯ карточка с равной высотой */}
      <Card className="netflix-card group">
        <div className="relative aspect-[2/3] overflow-hidden cursor-pointer" onClick={handleShowDetails}>
          <img
            src={movie.posterUrl || "/placeholder.svg"}
            alt={movie.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(movie.title)}`
            }}
          />

          {/* Кнопки действий */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300`}>
            {/* Кнопка "Посмотрю позже" */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWatchlistClick}
              className={`netflix-favorite-button p-2 transition-all duration-200 ${
                movie.isInWatchlist
                  ? "text-[#5e1414] hover:text-[#8b1c24] bg-[#5e1414]/20"
                  : "text-gray-400 hover:text-[#5e1414] hover:bg-[#5e1414]/10"
              }`}
              title={movie.isInWatchlist ? "Убрать из списка просмотра" : "Добавить в 'Посмотрю позже'"}
            >
              {movie.isInWatchlist ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
            
            {/* Кнопка "Просмотрено" */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWatchedClick}
              className={`netflix-favorite-button p-2 transition-all duration-200 ${
                movie.isWatched
                  ? "text-green-500 hover:text-green-400 bg-green-500/20"
                  : "text-gray-400 hover:text-green-500 hover:bg-green-500/10"
              }`}
              title={movie.isWatched ? "Отменить как просмотренный" : "Отметить как просмотренный"}
            >
              <CheckSquare className={`h-4 w-4 ${movie.isWatched ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* УЛУЧШЕННАЯ информация с лучшим контрастом */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
            {/* Год и рейтинг ВВЕРХУ под названием */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-3 w-3 text-gray-300" />
                <span className="text-gray-300">{movie.year}</span>
                {movie.mediaType === "tv" && <Badge className="netflix-badge-tv text-xs px-2 py-0.5">Сериал</Badge>}
              </div>
              {movie.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-white font-medium">{movie.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <h3 className="text-base font-bold text-white drop-shadow-lg mb-2 line-clamp-2" title={movie.title}>
              {movie.title}
            </h3>
            
            {/* Показываем оценку если фильм просмотрен */}
            {movie.isWatched && movie.userRating && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-gray-300">Ваша оценка:</span>
                <div className="flex items-center gap-1 px-2 py-1 bg-[#5e1414]/20 rounded-full">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-yellow-400 font-medium">{movie.userRating}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <CardContent className="netflix-card-content p-4 cursor-pointer" onClick={handleShowDetails}>
          {/* Жанры ВНИЗУ мелким текстом */}
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 3).map((genre, index) => (
              <Badge key={index} className="netflix-badge-genre text-xs">
                {genre}
              </Badge>
            ))}
            {movie.genre.length > 3 && <Badge className="netflix-badge-genre text-xs">+{movie.genre.length - 3}</Badge>}
          </div>

          {/* Описание с fade-маской */}
          <div className="text-sm text-gray-400 relative">
            <p className="line-clamp-3" title={movie.description}>
              {movie.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* КОМПАКТНАЯ модалка */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="netflix-modal-compact max-w-4xl w-[90vw] max-h-[85vh]">
          <DialogHeader className="netflix-modal-header">
            <DialogTitle className="netflix-dialog-title text-xl">{movieToShow.title}</DialogTitle>
          </DialogHeader>

          <div className="netflix-modal-content">
            {isLoadingDetails ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b1c24] mx-auto mb-4"></div>
                <p className="text-gray-300">Загрузка...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Постер - компактнее */}
                <div className="md:col-span-2">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                    <img
                      src={movieToShow.posterUrl || "/placeholder.svg"}
                      alt={movieToShow.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(movieToShow.title)}`
                      }}
                    />
                  </div>

                  {/* Новые кнопки действий */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className={`flex-1 netflix-button-outline ${
                        movie.isInWatchlist ? "bg-[#5e1414]/20 border-[#5e1414] text-[#5e1414]" : ""
                      }`}
                      onClick={handleWatchlistClick}
                    >
                      {movie.isInWatchlist ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Убрать из списка
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Посмотрю позже
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`flex-1 netflix-button-outline ${
                        movie.isWatched ? "bg-green-500/20 border-green-500 text-green-400" : ""
                      }`}
                      onClick={handleWatchedClick}
                    >
                      <CheckSquare className={`h-4 w-4 mr-2 ${movie.isWatched ? "fill-current" : ""}`} />
                      {movie.isWatched ? "Просмотрено" : "Отметить просмотренным"}
                    </Button>
                  </div>
                  
                  {/* Показываем оценку в модалке */}
                  {movie.isWatched && movie.userRating && (
                    <div className="mt-3 p-3 bg-[#5e1414]/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Ваша оценка:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-yellow-400 font-medium">{movie.userRating}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Информация - компактнее */}
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{movieToShow.title}</h2>
                    {movieToShow.originalTitle && movieToShow.originalTitle !== movieToShow.title && (
                      <p className="text-base text-gray-400 mb-3 italic">{movieToShow.originalTitle}</p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {movieToShow.genre.map((genre, index) => (
                        <Badge key={index} className="netflix-badge-genre">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Компактная сетка информации */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="netflix-info-item">
                      <span className="netflix-info-label">Год:</span>
                      <span className="netflix-info-value">{movieToShow.year}</span>
                    </div>

                    {movieToShow.rating && (
                      <div className="netflix-info-item">
                        <span className="netflix-info-label">Рейтинг:</span>
                        <span className="netflix-info-value">⭐ {movieToShow.rating}/10</span>
                      </div>
                    )}

                    {movieToShow.runtime && (
                      <div className="netflix-info-item">
                        <span className="netflix-info-label">Длительность:</span>
                        <span className="netflix-info-value">{movieToShow.runtime}</span>
                      </div>
                    )}

                    {movieToShow.released && (
                      <div className="netflix-info-item">
                        <span className="netflix-info-label">Премьера:</span>
                        <span className="netflix-info-value">{movieToShow.released}</span>
                      </div>
                    )}

                    {movieToShow.seasons && (
                      <div className="netflix-info-item">
                        <span className="netflix-info-label">Сезонов:</span>
                        <span className="netflix-info-value">{movieToShow.seasons}</span>
                      </div>
                    )}

                    {movieToShow.episodes && (
                      <div className="netflix-info-item">
                        <span className="netflix-info-label">Эпизодов:</span>
                        <span className="netflix-info-value">{movieToShow.episodes}</span>
                      </div>
                    )}
                  </div>

                  {movieToShow.director && (
                    <div className="netflix-info-item">
                      <span className="netflix-info-label">Режиссёр:</span>
                      <span className="netflix-info-value">{movieToShow.director}</span>
                    </div>
                  )}

                  {movieToShow.actors && (
                    <div className="netflix-info-item">
                      <span className="netflix-info-label">Актёры:</span>
                      <span className="netflix-info-value">{movieToShow.actors}</span>
                    </div>
                  )}

                  {/* Компактное описание */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Описание</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{movieToShow.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Диалог оценки */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-md netflix-dialog">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              Оцените фильм
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">{movie.title}</h3>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className="p-1 transition-colors"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        rating <= selectedRating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400 hover:text-yellow-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {selectedRating > 0 && (
                <p className="text-center text-sm text-gray-400 mt-2">
                  Ваша оценка: {selectedRating} звезд{selectedRating > 1 && selectedRating < 5 ? 'ы' : selectedRating === 1 ? 'а' : ''}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setShowRatingDialog(false)}>
                Отмена
              </Button>
              <Button 
                onClick={handleSaveRating}
                disabled={selectedRating === 0}
                className="netflix-button"
              >
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}