"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Search,
  Film,
  Loader2,
  ChevronDown,
  AlertCircle,
  Database,
  Filter,
  Heart,
  User,
  Tv,
  Play,
  ArrowUp,
  Calendar,
  CheckSquare,
} from "lucide-react"
import { MovieCard } from "@/components/movie-card"
import { MovieProjector } from "@/components/movie-projector"
import { FilterDialog } from "@/components/filter-dialog"
import { AuthDialog } from "@/components/auth-dialog"
import { tmdbService, type Movie } from "@/lib/tmdb-service"
import { MovieService } from "@/lib/movie-service"
export type { Movie }
import { getAuthService } from "@/lib/auth-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [hasMoreMovies, setHasMoreMovies] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<"api" | "local">("local")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [selectedSpecials, setSelectedSpecials] = useState<string[]>([])
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [mediaType, setMediaType] = useState<"all" | "movie" | "tv">("all")
  const [currentUser, setCurrentUser] = useState<import("@/lib/auth-service").User | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [watchlistMovieIds, setWatchlistMovieIds] = useState<string[]>([])
  const [watchedMovies, setWatchedMovies] = useState<import("@/lib/auth-service").WatchedMovie[]>([])  
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [selectedMovieForRating, setSelectedMovieForRating] = useState<Movie | null>(null)

  // Отслеживание скролла для кнопки "наверх"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Инициализация пользователя и списков только на клиенте
  useEffect(() => {
    const authService = getAuthService()
    if (authService) {
      setCurrentUser(authService.getCurrentUser())
      setWatchlistMovieIds(authService.loadWatchlist())
      setWatchedMovies(authService.loadWatched())
    }
  }, [])

  // Обновляем статус фильмов в списках пользователя  
  const updateMoviesWithUserData = useCallback(() => {
    setMovies((prev) =>
      prev.map((movie) => ({
        ...movie,
        isInWatchlist: watchlistMovieIds.includes(movie.id),
        isWatched: watchedMovies.some(w => w.movieId === movie.id),
        userRating: watchedMovies.find(w => w.movieId === movie.id)?.rating,
      })),
    )
    setAllMovies((prev) =>
      prev.map((movie) => ({
        ...movie,
        isInWatchlist: watchlistMovieIds.includes(movie.id),
        isWatched: watchedMovies.some(w => w.movieId === movie.id),
        userRating: watchedMovies.find(w => w.movieId === movie.id)?.rating,
      })),
    )
  }, [watchlistMovieIds, watchedMovies])

  useEffect(() => {
    updateMoviesWithUserData()
  }, [updateMoviesWithUserData])

  // Загрузка популярного контента при старте и при изменении типа медиа
  useEffect(() => {
    loadPopularContent()
  }, [mediaType])

  // ИСПРАВЛЕНО: Функция для применения избранных к новым фильмам
  const applyUserDataToMovies = useCallback(
    (moviesList: Movie[]): Movie[] => {
      return moviesList.map((movie) => ({
        ...movie,
        isInWatchlist: watchlistMovieIds.includes(movie.id),
        isWatched: watchedMovies.some(w => w.movieId === movie.id),
        userRating: watchedMovies.find(w => w.movieId === movie.id)?.rating,
      }))
    },
    [watchlistMovieIds, watchedMovies],
  )

  // Загрузка популярного контента
  const loadPopularContent = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { movies: popularContent, source } = await tmdbService.getPopularMovies(mediaType)

      const contentWithUserData = applyUserDataToMovies(popularContent)

      setMovies(contentWithUserData)
      setAllMovies(contentWithUserData)
      setDataSource(source)
      setCurrentPage(1)
      setTotalResults(contentWithUserData.length)
      // Устанавливаем hasMoreMovies для локальной базы тоже
      if (source === "local") {
        // Для локальной базы показываем кнопку "Еще" если есть больше фильмов чем показано
        const movieService = new MovieService()
        await movieService.initialize()
        const allAvailableMovies = await movieService.getPopularMovies(1, 1000)
        setHasMoreMovies(allAvailableMovies.length > contentWithUserData.length)
      } else {
        setHasMoreMovies(contentWithUserData.length >= 20)
      }
    } catch (error) {
      console.error("Ошибка при загрузке контента:", error)
      // Убрано сообщение об ошибке для чистоты интерфейса
      // setError("Не удалось загрузить контент. Используется локальная база данных.")
      setDataSource("local")
    } finally {
      setIsLoading(false)
    }
  }

  // Поиск с debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch()
      } else {
        loadPopularContent()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, mediaType])

  // Функция поиска
  const handleSearch = async (page = 1) => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const {
        movies: searchResults,
        totalResults: total,
        source,
      } = await tmdbService.searchMovies(searchTerm, page, mediaType)

      const resultsWithUserData = applyUserDataToMovies(searchResults)

      if (page === 1) {
        setMovies(resultsWithUserData)
        setAllMovies(resultsWithUserData)
        setCurrentPage(1)
      } else {
        const newMovies = [...allMovies, ...resultsWithUserData].filter(
          (movie, index, self) => self.findIndex(m => m.id === movie.id) === index
        )
        setMovies(newMovies)
        setAllMovies(newMovies)
        setCurrentPage(page)
      }

      setTotalResults(total)
      setDataSource(source)
      setHasMoreMovies(
        source === "api" && searchResults.length === 20 && allMovies.length + searchResults.length < total,
      )
    } catch (error) {
      console.error("Ошибка при поиске:", error)
      // Убрано сообщение об ошибке для чистоты интерфейса
      // setError("Ошибка поиска. Используется локальная база данных.")
      setDataSource("local")
    } finally {
      setIsSearching(false)
    }
  }

  // ИСПРАВЛЕНО: Загрузка дополнительных результатов без дублирования
  const loadMoreMovies = async () => {
    if (isLoadingMore || !hasMoreMovies) return

    setIsLoadingMore(true)
    try {
      if (searchTerm.trim()) {
        await handleSearch(currentPage + 1)
      } else {
        const { movies: moreMovies, source } = await tmdbService.getMoreMovies(allMovies, mediaType, currentPage + 1)
        if (moreMovies.length > 0) {
          const moreMoviesWithUserData = applyUserDataToMovies(moreMovies)
          const uniqueMovies = [...allMovies, ...moreMoviesWithUserData].filter(
            (movie, index, self) => self.findIndex(m => m.id === movie.id) === index
          )
          setMovies(uniqueMovies)
          setAllMovies(uniqueMovies)
          setCurrentPage((prev) => prev + 1)
          
          // Проверяем есть ли еще фильмы для загрузки
          if (source === "local") {
            const movieService = new MovieService()
            await movieService.initialize()
            const totalAvailable = await movieService.getPopularMovies(1, 1000)
            setHasMoreMovies(uniqueMovies.length < totalAvailable.length)
          } else {
            setHasMoreMovies(moreMovies.length >= 20)
          }
        } else {
          setHasMoreMovies(false)
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке дополнительного контента:", error)
      // Убрано сообщение об ошибке для чистоты интерфейса
      // setError("Ошибка загрузки дополнительных результатов")
      setHasMoreMovies(false)
    } finally {
      setIsLoadingMore(false)
    }
  }

  // Загрузка детальной информации
  const loadMovieDetails = async (tmdbId: number, mediaType: "movie" | "tv"): Promise<Movie | null> => {
    try {
      const details = await tmdbService.getMovieDetails(tmdbId, mediaType)
      if (details) {
        details.isInWatchlist = watchlistMovieIds.includes(details.id)
        details.isWatched = watchedMovies.some(w => w.movieId === details.id)
        details.userRating = watchedMovies.find(w => w.movieId === details.id)?.rating
      }
      return details
    } catch (error) {
      console.error("Ошибка загрузки деталей:", error)
      return null
    }
  }

  // Обработчик для добавления/удаления из "Посмотрю позже"
  const toggleWatchlist = useCallback(
    (id: string) => {
      const authService = getAuthService()
      if (!currentUser) {
        setShowAuthDialog(true)
        return
      }
      
      const newWatchlistIds = watchlistMovieIds.includes(id)
        ? watchlistMovieIds.filter((wId) => wId !== id)
        : [...watchlistMovieIds, id]
      
      setWatchlistMovieIds(newWatchlistIds)
      if (authService) authService.saveWatchlist(newWatchlistIds)
    },
    [currentUser, watchlistMovieIds],
  )

  // Обработчик для отметки как "Просмотрено" с оценкой
  const markAsWatched = useCallback(
    (movie: Movie, rating?: number, comment?: string) => {
      const authService = getAuthService()
      if (!currentUser) {
        setShowAuthDialog(true)
        return
      }
      
      const watchedMovie = {
        movieId: movie.id,
        title: movie.title,
        rating: rating || 0,
        comment: comment || '',
        watchedAt: new Date().toISOString(),
        poster: movie.posterUrl || ''
      }
      
      const newWatchedMovies = watchedMovies.filter(w => w.movieId !== movie.id)
      newWatchedMovies.push(watchedMovie)
      
      setWatchedMovies(newWatchedMovies)
      if (authService) authService.saveWatched(newWatchedMovies)
      
      // Удаляем из "Посмотрю позже" если там есть
      if (watchlistMovieIds.includes(movie.id)) {
        const newWatchlistIds = watchlistMovieIds.filter(id => id !== movie.id)
        setWatchlistMovieIds(newWatchlistIds)
        if (authService) authService.saveWatchlist(newWatchlistIds)
      }
    },
    [currentUser, watchedMovies, watchlistMovieIds],
  )
  
  // Обработчик для удаления из "Просмотрено"
  const removeFromWatched = useCallback(
    (movieId: string) => {
      const authService = getAuthService()
      if (!currentUser) return
      
      const newWatchedMovies = watchedMovies.filter(w => w.movieId !== movieId)
      setWatchedMovies(newWatchedMovies)
      if (authService) authService.saveWatched(newWatchedMovies)
    },
    [currentUser, watchedMovies],
  )

  // ИСПРАВЛЕНО: Применение фильтров с правильной логикой
  const handleApplyFilters = useCallback(
    (genreIds: number[], specialFilters: string[]) => {
      console.log("Применяем фильтры:", { genreIds, specialFilters })

      setSelectedGenres(genreIds)
      setSelectedSpecials(specialFilters)
      setShowFilterDialog(false)

      if (genreIds.length === 0 && specialFilters.length === 0) {
        setMovies(allMovies)
        return
      }

      let filteredMovies = [...allMovies]

      // ИСПРАВЛЕНО: Фильтрация по жанрам
      if (genreIds.length > 0) {
        filteredMovies = filteredMovies.filter((movie) => {
          return movie.genre.some((g) => {
            // Проверяем как числовые ID, так и названия жанров
            const genreId = Number.parseInt(g)
            if (!isNaN(genreId)) {
              return genreIds.includes(genreId)
            }
            // Проверяем по названию жанра
            return genreIds.some((id) => getGenreName(id) === g)
          })
        })
        console.log("После фильтрации по жанрам:", filteredMovies.length)
      }

      // ИСПРАВЛЕНО: Фильтрация по специальным подборкам
      if (specialFilters.length > 0) {
        specialFilters.forEach((filter) => {
          switch (filter) {
            case "new":
              filteredMovies = filteredMovies.filter((movie) => movie.year >= 2023)
              console.log("После фильтра 'Новинки':", filteredMovies.length)
              break
            case "popular":
              filteredMovies = [...filteredMovies].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
              console.log("После сортировки по популярности:", filteredMovies.length)
              break
            case "top_rated":
              filteredMovies = filteredMovies.filter((movie) => (movie.rating || 0) >= 8.0)
              console.log("После фильтра 'Высокий рейтинг' (>=8.0):", filteredMovies.length)
              break
          }
        })
      }

      console.log("Итоговое количество фильмов после фильтрации:", filteredMovies.length)
      setMovies(filteredMovies)
    },
    [allMovies],
  )

  // Получение названия жанра по ID
  const getGenreName = (genreId: number): string => {
    const genreMap: Record<number, string> = {
      28: "Боевик",
      12: "Приключения",
      16: "Мультфильм",
      35: "Комедия",
      80: "Криминал",
      99: "Документальный",
      18: "Драма",
      10751: "Семейный",
      14: "Фэнтези",
      36: "История",
      27: "Ужасы",
      10402: "Музыка",
      9648: "Детектив",
      10749: "Мелодрама",
      878: "Фантастика",
      53: "Триллер",
      10752: "Военный",
      37: "Вестерн",
    }
    return genreMap[genreId] || "Неизвестно"
  }

  // Получение названия специального фильтра
  const getSpecialFilterName = (filterId: string): string => {
    const filterMap: Record<string, string> = {
      new: "Новинки",
      popular: "Популярные",
      top_rated: "Высокий рейтинг",
    }
    return filterMap[filterId] || ""
  }

  // Обработка успешной авторизации
  const handleAuthSuccess = () => {
    const authService = getAuthService()
    if (authService) {
      setCurrentUser(authService.getCurrentUser())
      // Загружаем все списки для нового пользователя
      // favoriteMovieIds больше не используется
      setWatchlistMovieIds(authService.loadWatchlist())
      setWatchedMovies(authService.loadWatched())
    }
  }

  // Выход из аккаунта
  const handleLogout = () => {
    const authService = getAuthService()
    if (authService) authService.logout()
    setCurrentUser(null)
    // favoriteMovieIds больше не используется
    setWatchlistMovieIds([])
    setWatchedMovies([])
  }

  // Прокрутка наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ИСПРАВЛЕНО: Фильтрация по табам с учетом фильтров жанров
  const getFilteredMovies = () => {
    let baseMovies: Movie[] = []
    
    switch (activeTab) {
      case "watchlist":
        // Фильмы в списке "Посмотрю позже"
        baseMovies = allMovies.filter((movie) => watchlistMovieIds.includes(movie.id))
        break
      case "watched":
        // Фильмы в списке "Просмотрено"
        const watchedIds = watchedMovies.map(w => w.movieId)
        baseMovies = allMovies.filter((movie) => watchedIds.includes(movie.id))
        break
      default:
        // Для вкладки "Все" используем уже отфильтрованные movies
        return movies
    }
    
    // Применяем фильтры жанров и специальные фильтры к watchlist и watched
    if (selectedGenres.length > 0 || selectedSpecials.length > 0) {
      // Фильтрация по жанрам
      if (selectedGenres.length > 0) {
        baseMovies = baseMovies.filter((movie) => {
          return movie.genre.some((g) => {
            const genreId = Number.parseInt(g)
            if (!isNaN(genreId)) {
              return selectedGenres.includes(genreId)
            }
            return selectedGenres.some((id) => getGenreName(id) === g)
          })
        })
      }
      
      // Фильтрация по специальным подборкам
      if (selectedSpecials.length > 0) {
        selectedSpecials.forEach((filter) => {
          switch (filter) {
            case "new":
              baseMovies = baseMovies.filter((movie) => movie.year >= 2023)
              break
            case "popular":
              baseMovies = [...baseMovies].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
              break
            case "top_rated":
              baseMovies = baseMovies.filter((movie) => (movie.rating || 0) >= 8.0)
              break
          }
        })
      }
    }
    
    return baseMovies
  }

  const filteredMovies = getFilteredMovies()
  const watchlistCount = watchlistMovieIds.length
  const watchedCount = watchedMovies.length

  // Формирование текста активных фильтров
  const getActiveFiltersText = () => {
    const parts = []
    if (selectedGenres.length > 0) {
      parts.push(selectedGenres.map((id) => getGenreName(id)).join(", "))
    }
    if (selectedSpecials.length > 0) {
      parts.push(selectedSpecials.map((id) => getSpecialFilterName(id)).join(", "))
    }
    return parts.length > 0 ? `(${parts.join(" + ")})` : ""
  }

  return (
    <main className="min-h-screen netflix-background pb-10">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* УЛУЧШЕННЫЙ заголовок с правильной иерархией */}
        <header className="text-center py-8 relative">
          {/* Кнопки аутентификации - упрощенные */}
          <div className="absolute top-4 right-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-300 font-normal text-sm">Привет, {currentUser.name}!</span>
                <Button variant="ghost" onClick={handleLogout} className="netflix-button-ghost text-sm">
                  Выйти
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setShowAuthDialog(true)} className="netflix-button-outline">
                <User className="h-4 w-4 mr-2" />
                Войти
              </Button>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <MovieProjector className="h-16 w-16 text-netflix-red drop-shadow-lg" />
          </div>
          <h1 className="netflix-title text-5xl mb-2 tracking-tight">Киноархив</h1>
          <p className="netflix-subtitle text-lg font-light opacity-75">
            Ваша персональная коллекция фильмов и сериалов
          </p>
        </header>

        {/* УЛУЧШЕННЫЙ поиск без лишних бордюров */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="netflix-search-container">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="🎬 Поиск фильмов и сериалов..."
                className="netflix-input pl-12 pr-4 py-3 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="h-5 w-5 animate-spin text-[#8b1c24]" />
                </div>
              )}
            </div>

            {/* УЛУЧШЕННЫЕ фильтры по типу контента */}
            <div className="flex justify-center gap-2">
              <Button
                variant={mediaType === "all" ? "default" : "outline"}
                onClick={() => setMediaType("all")}
                className={mediaType === "all" ? "netflix-button-active" : "netflix-button-outline"}
                size="sm"
              >
                <Play className="h-4 w-4 mr-2" />
                Всё
              </Button>
              <Button
                variant={mediaType === "movie" ? "default" : "outline"}
                onClick={() => setMediaType("movie")}
                className={mediaType === "movie" ? "netflix-button-active" : "netflix-button-outline"}
                size="sm"
              >
                <Film className="h-4 w-4 mr-2" />
                Фильмы
              </Button>
              <Button
                variant={mediaType === "tv" ? "default" : "outline"}
                onClick={() => setMediaType("tv")}
                className={mediaType === "tv" ? "netflix-button-active" : "netflix-button-outline"}
                size="sm"
              >
                <Tv className="h-4 w-4 mr-2" />
                Сериалы
              </Button>
            </div>

            {searchTerm && (
              <p className="text-sm text-gray-400 mt-2 text-center">
                Поиск: "{searchTerm}" • Найдено: {totalResults} результатов
              </p>
            )}
          </div>
        </div>

        {/* STICKY фильтры и табы */}
        <div className="sticky top-0 z-40 bg-netflix-black/95 backdrop-blur-sm border-b border-gray-800 pb-4 mb-6">
          <div className="max-w-4xl mx-auto pt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <TabsList className="netflix-tabs">
                  <TabsTrigger value="all" className="netflix-tab">
                    <Play className="h-4 w-4 mr-2" />
                    Все
                  </TabsTrigger>
                  <TabsTrigger value="watchlist" className="netflix-tab">
                    <Calendar className="h-4 w-4 mr-2" />
                    Посмотрю позже {currentUser && watchlistCount > 0 && `(${watchlistCount})`}
                  </TabsTrigger>
                  <TabsTrigger value="watched" className="netflix-tab">
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Просмотрено {currentUser && watchedCount > 0 && `(${watchedCount})`}
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-3">
                  {/* Счетчик результатов */}
                  <span className="text-sm text-gray-400">
                    {activeTab === "watchlist" && `${watchlistCount} в списке`}
                    {activeTab === "watched" && `${watchedCount} просмотрено`}
                    {activeTab === "all" && `${filteredMovies.length} фильмов`}
                  </span>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilterDialog(true)}
                    className="netflix-button-outline"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Фильтры {getActiveFiltersText()}
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-0" />
              <TabsContent value="watchlist" className="mt-0" />
              <TabsContent value="watched" className="mt-0" />
            </Tabs>
          </div>
        </div>

        {/* Информационные сообщения - убраны технические детали для чистоты интерфейса */}

        {!currentUser && (activeTab === "watchlist" || activeTab === "watched") && (
          <div className="max-w-2xl mx-auto mb-6">
            <Alert className="border-[#5e1414]/50 bg-[#5e1414]/10">
              <User className="h-4 w-4 text-[#5e1414]" />
              <AlertDescription className="text-gray-300">
                💡 Войдите в аккаунт, чтобы сохранять списки фильмов и сериалов!
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Результаты */}
        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#8b1c24] mb-4" />
            <p className="text-lg text-gray-300">Загрузка контента...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <div className="netflix-empty-state p-8">
              {activeTab === "watchlist" && <Calendar className="h-16 w-16 mx-auto mb-6 text-[#5e1414]" />}
              {activeTab === "watched" && <CheckSquare className="h-16 w-16 mx-auto mb-6 text-[#5e1414]" />}
              {activeTab === "watchlist" && <Calendar className="h-16 w-16 mx-auto mb-6 text-[#5e1414]" />}
              {activeTab === "watched" && <CheckSquare className="h-16 w-16 mx-auto mb-6 text-[#5e1414]" />}
              {activeTab === "all" && <Film className="h-16 w-16 mx-auto mb-6 text-[#5e1414]" />}
              
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeTab === "favorites" && "Нет избранного контента"}
                {activeTab === "watchlist" && "Список пуст"}
                {activeTab === "watched" && "Нет просмотренных фильмов"}
                {activeTab === "all" && (searchTerm ? "Контент не найден" : "Добро пожаловать!")}
              </h2>
              <p className="text-gray-400">
                {activeTab === "favorites" && (currentUser
                  ? "Добавьте фильмы и сериалы в избранное, нажав на сердечко"
                  : "Войдите в аккаунт, чтобы сохранять избранное")}
                {activeTab === "watchlist" && (currentUser
                  ? "Добавьте фильмы в список \"Посмотрю позже\""
                  : "Войдите в аккаунт, чтобы создавать списки")}
                {activeTab === "watched" && (currentUser
                  ? "Отметьте просмотренные фильмы и поставьте им оценку"
                  : "Войдите в аккаунт, чтобы отмечать просмотренные фильмы")}
                {activeTab === "all" && (searchTerm
                  ? "Попробуйте изменить поисковый запрос"
                  : "Найдите свои любимые фильмы и сериалы")}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* УЛУЧШЕННАЯ сетка контента с равной высотой */}
            <div className="netflix-grid">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onToggleWatchlist={toggleWatchlist}
                  onMarkAsWatched={markAsWatched}
                  onRemoveFromWatched={removeFromWatched}
                  onLoadDetails={(tmdbId) => loadMovieDetails(tmdbId, movie.mediaType)}
                />
              ))}
            </div>

            {/* Кнопка "Ещё" */}
            {activeTab === "all" && hasMoreMovies && (
              <div className="text-center mt-12">
                <Button
                  onClick={loadMoreMovies}
                  disabled={isLoadingMore}
                  className="netflix-button px-8 py-3 text-base"
                  size="lg"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    <>
                      Ещё контент <ChevronDown className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Кнопка прокрутки наверх */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 netflix-button-fab"
          size="icon"
          aria-label="Прокрутить наверх"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Диалоги */}
      <FilterDialog
        open={showFilterDialog}
        onOpenChange={setShowFilterDialog}
        selectedGenres={selectedGenres}
        selectedSpecials={selectedSpecials}
        onApplyFilters={handleApplyFilters}
      />

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} onAuthSuccess={handleAuthSuccess} />
    </main>
  )
}
