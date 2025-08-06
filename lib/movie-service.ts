import { type MovieData, getYearFromDate, getPosterUrl, getBackdropUrl, movieDatabase as preloadedMovies } from "./movie-database"
import type { Movie } from "@/lib/tmdb-service"

// Класс для работы с фильмами
export class MovieService {
  private movies: MovieData[] = []
  private isInitialized = false
  private isLoading = false

  // Инициализация сервиса
  async initialize(): Promise<void> {
    if (this.isInitialized || this.isLoading) return

    this.isLoading = true
    try {
      // Используем предварительно загруженные фильмы
      this.movies = [...preloadedMovies]
      
      // Перемешиваем фильмы для разнообразия
      this.shuffleMovies()

      this.isInitialized = true
      console.log(`Загружено ${this.movies.length} фильмов`)
    } catch (error) {
      console.error("Ошибка при инициализации базы фильмов:", error)
      // Используем базовый набор фильмов
      this.movies = [...preloadedMovies]
      this.isInitialized = true
    } finally {
      this.isLoading = false
    }
  }

  // Перемешивание массива фильмов для разнообразия
  private shuffleMovies(): void {
    this.movies = [...preloadedMovies].sort(() => Math.random() - 0.5)
  }

  // Поиск фильмов
  async searchMovies(query: string): Promise<Movie[]> {
    await this.initialize()

    if (!query.trim()) {
      return this.getPopularMovies(1, 20)
    }

    const searchLower = query.toLowerCase()
    const results = this.movies.filter(
      (movie) =>
        movie.title?.toLowerCase().includes(searchLower) ||
        movie.original_title?.toLowerCase().includes(searchLower) ||
        movie.overview?.toLowerCase().includes(searchLower),
    )

    // Сортируем по популярности
    results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

    // Возвращаем первые 50 результатов
    return results.slice(0, 50).map((movie) => this.convertToMovie(movie))
  }

  // Получение популярных фильмов с уникальностью
  async getPopularMovies(page = 1, pageSize = 20): Promise<Movie[]> {
    await this.initialize()

    // Получаем неиспользованные фильмы
    const unused = this.movies.filter(movie => !this.usedMovieIds.has(movie.id))
    
    // Если неиспользованных фильмов мало, сбрасываем кэш
    if (unused.length < pageSize) {
      this.resetUsedMovies()
    }
    
    // Сортируем по популярности
    const sorted = [...this.movies]
      .filter(movie => !this.usedMovieIds.has(movie.id))
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

    // Вычисляем начальный и конечный индексы для пагинации
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const result = sorted.slice(start, end)
    
    // Отмечаем фильмы как использованные
    result.forEach(movie => this.usedMovieIds.add(movie.id))

    // Возвращаем фильмы для текущей страницы
    return result.map((movie) => this.convertToMovie(movie))
  }

  // Получение фильмов по жанру
  async getMoviesByGenre(genreId: number, page = 1, pageSize = 20): Promise<Movie[]> {
    await this.initialize()

    const filtered = this.movies.filter((movie) => movie.genre_ids.includes(genreId))

    // Сортируем по популярности
    filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

    // Вычисляем начальный и конечный индексы для пагинации
    const start = (page - 1) * pageSize
    const end = start + pageSize

    // Возвращаем фильмы для текущей страницы
    return filtered.slice(start, end).map((movie) => this.convertToMovie(movie))
  }

  // Получение рекомендуемых фильмов по категориям с уникальной логикой
  private usedMovieIds = new Set<number>()
  
  async getRecommendedMovies(category: string, count = 10, offset = 0): Promise<Movie[]> {
    await this.initialize()

    let filtered: MovieData[] = []

    switch (category) {
      case "popular":
        // Самые популярные фильмы
        filtered = [...this.movies]
          .filter(movie => !this.usedMovieIds.has(movie.id))
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        break
      case "top_rated":
        // Фильмы с высоким рейтингом
        filtered = [...this.movies]
          .filter(movie => !this.usedMovieIds.has(movie.id))
          .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        break
      case "classics":
        // Классические фильмы (до 1990 года)
        filtered = this.movies
          .filter((movie) => {
            const year = getYearFromDate(movie.release_date)
            return year && year < 1990 && !this.usedMovieIds.has(movie.id)
          })
          .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        break
      case "recent":
        // Недавние фильмы (последние 5 лет)
        const currentYear = new Date().getFullYear()
        filtered = this.movies
          .filter((movie) => {
            const year = getYearFromDate(movie.release_date)
            return year && year >= currentYear - 5 && !this.usedMovieIds.has(movie.id)
          })
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        break
      default:
        // По умолчанию возвращаем случайные фильмы
        filtered = this.getRandomUniqueMovies(count * 2)
    }

    // Применяем offset для пагинации
    const result = filtered.slice(offset, offset + count)
    
    // Добавляем ID использованных фильмов
    result.forEach(movie => this.usedMovieIds.add(movie.id))
    
    return result.map((movie) => this.convertToMovie(movie))
  }

  // Получение случайных фильмов
  getRandomMovies(count = 10): MovieData[] {
    const shuffled = [...this.movies].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }
  
  // Получение уникальных случайных фильмов (не показанных ранее)
  getRandomUniqueMovies(count = 10): MovieData[] {
    const unused = this.movies.filter(movie => !this.usedMovieIds.has(movie.id))
    const shuffled = [...unused].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }
  
  // Сброс кэша использованных фильмов
  resetUsedMovies(): void {
    this.usedMovieIds.clear()
  }

  // Преобразование MovieData в Movie
  convertToMovie(movieData: MovieData): Movie {
    return {
      id: `tmdb-${movieData.id}`,
      tmdbId: movieData.id,
      title: movieData.title,
      originalTitle: movieData.original_title,
      year: getYearFromDate(movieData.release_date) || 0,
      genre: movieData.genre_ids.map((id) => id.toString()),
      description: movieData.overview || "",
      posterUrl: getPosterUrl(movieData.poster_path),
      backdropUrl: getBackdropUrl(movieData.backdrop_path),
      isFavorite: false,
      rating: movieData.vote_average,
      popularity: movieData.popularity,
      mediaType: "movie", // По умолчанию фильм
    }
  }
}

// Создаем и экспортируем экземпляр сервиса
export const movieService = new MovieService()
