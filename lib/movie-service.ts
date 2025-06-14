import { type MovieData, getYearFromDate, getPosterUrl, getBackdropUrl, preloadedMovies } from "./movie-database"
import type { Movie } from "@/app/page"

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

      // Генерируем дополнительные фильмы для демонстрации
      this.generateAdditionalMovies()

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

  // Генерация дополнительных фильмов для демонстрации
  private generateAdditionalMovies(): void {
    // Создаем копии существующих фильмов с измененными названиями для демонстрации
    const baseMovies = [...preloadedMovies]
    const additionalMovies: MovieData[] = []

    // Создаем 100 дополнительных фильмов
    for (let i = 0; i < 100; i++) {
      const baseMovie = baseMovies[i % baseMovies.length]
      const newId = 10000 + i

      additionalMovies.push({
        ...baseMovie,
        id: newId,
        title: `${baseMovie.title} ${Math.floor(i / baseMovies.length) + 2}`,
        original_title: baseMovie.original_title
          ? `${baseMovie.original_title} ${Math.floor(i / baseMovies.length) + 2}`
          : undefined,
        popularity: (baseMovie.popularity || 50) - (i % 10),
        vote_average: ((baseMovie.vote_average || 7) - (i % 20) / 10) % 10,
      })
    }

    this.movies = [...this.movies, ...additionalMovies]
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

  // Получение популярных фильмов
  async getPopularMovies(page = 1, pageSize = 20): Promise<Movie[]> {
    await this.initialize()

    // Сортируем по популярности
    const sorted = [...this.movies].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

    // Вычисляем начальный и конечный индексы для пагинации
    const start = (page - 1) * pageSize
    const end = start + pageSize

    // Возвращаем фильмы для текущей страницы
    return sorted.slice(start, end).map((movie) => this.convertToMovie(movie))
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

  // Получение рекомендуемых фильмов по категориям
  async getRecommendedMovies(category: string, count = 10): Promise<Movie[]> {
    await this.initialize()

    let filtered: MovieData[] = []

    switch (category) {
      case "popular":
        // Самые популярные фильмы
        filtered = [...this.movies].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        break
      case "top_rated":
        // Фильмы с высоким рейтингом
        filtered = [...this.movies].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        break
      case "classics":
        // Классические фильмы (до 1990 года)
        filtered = this.movies
          .filter((movie) => {
            const year = getYearFromDate(movie.release_date)
            return year && year < 1990
          })
          .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        break
      case "recent":
        // Недавние фильмы (последние 2 года)
        const currentYear = new Date().getFullYear()
        filtered = this.movies
          .filter((movie) => {
            const year = getYearFromDate(movie.release_date)
            return year && year >= currentYear - 2
          })
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        break
      default:
        // По умолчанию возвращаем случайные фильмы
        filtered = this.getRandomMovies(count * 2)
    }

    // Возвращаем первые N результатов
    return filtered.slice(0, count).map((movie) => this.convertToMovie(movie))
  }

  // Получение случайных фильмов
  getRandomMovies(count = 10): MovieData[] {
    const shuffled = [...this.movies].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Преобразование MovieData в Movie
  convertToMovie(movieData: MovieData): Movie {
    return {
      id: `tmdb-${movieData.id}`,
      tmdbId: movieData.id,
      title: movieData.title,
      originalTitle: movieData.original_title,
      year: getYearFromDate(movieData.release_date),
      genre: movieData.genre_ids.map((id) => id.toString()),
      description: movieData.overview || "",
      posterUrl: getPosterUrl(movieData.poster_path),
      backdropUrl: getBackdropUrl(movieData.backdrop_path),
      isFavorite: false,
      rating: movieData.vote_average,
      popularity: movieData.popularity,
    }
  }
}

// Создаем и экспортируем экземпляр сервиса
export const movieService = new MovieService()
