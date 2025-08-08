// Сервис для работы с TMDB API (фильмы и сериалы с русскими названиями)
export interface TMDBMovie {
  id: number
  title?: string // для фильмов
  name?: string // для сериалов
  original_title?: string // для фильмов
  original_name?: string // для сериалов
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string // для фильмов
  first_air_date?: string // для сериалов
  overview: string
  genre_ids: number[]
  vote_average: number
  popularity: number
  adult?: boolean
  media_type?: "movie" | "tv"
}

export interface TMDBSearchResponse {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

export interface TMDBDetailResponse extends TMDBMovie {
  runtime?: number | null // для фильмов
  episode_run_time?: number[] // для сериалов
  number_of_seasons?: number // для сериалов
  number_of_episodes?: number // для сериалов
  genres: Array<{ id: number; name: string }>
  production_countries: Array<{ iso_3166_1: string; name: string }>
  spoken_languages: Array<{ iso_639_1: string; name: string }>
  credits?: {
    cast: Array<{ name: string; character: string }>
    crew: Array<{ name: string; job: string }>
  }
}

// Наш внутренний тип для фильмов и сериалов
export interface Movie {
  id: string
  title: string
  originalTitle?: string
  year: number
  genre: string[]
  description: string
  posterUrl: string
  backdropUrl?: string
  isFavorite: boolean
  rating?: number
  director?: string
  actors?: string
  runtime?: string
  released?: string
  awards?: string
  tmdbId: number
  mediaType: "movie" | "tv" // Тип контента
  seasons?: number // Для сериалов
  episodes?: number // Для сериалов
  popularity?: number // Добавляем поле популярности
  isInWatchlist?: boolean // Для списка "Посмотрю позже"
  isWatched?: boolean // Для списка "Просмотрено"
  userRating?: number // Оценка пользователя 1-5
  userComment?: string // Комментарий пользователя
  watchedAt?: string // Дата просмотра
}

// Локальная база данных (расширенная с сериалами)
const localMovieDatabase: Movie[] = [
  // Фильмы
  {
    id: "local-1",
    title: "Побег из Шоушенка",
    originalTitle: "The Shawshank Redemption",
    year: 1994,
    genre: ["Драма"],
    description:
      "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием.",
    posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    isFavorite: false,
    rating: 9.3,
    director: "Фрэнк Дарабонт",
    actors: "Тим Роббинс, Морган Фриман",
    runtime: "142 мин",
    released: "23 сентября 1994",
    tmdbId: 278,
    mediaType: "movie",
    popularity: 88.32,
  },
  {
    id: "local-2",
    title: "Крёстный отец",
    originalTitle: "The Godfather",
    year: 1972,
    genre: ["Драма", "Криминал"],
    description: "Криминальная сага, повествующая о нью-йоркской сицилийской мафиозной семье Корлеоне.",
    posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    isFavorite: false,
    rating: 9.2,
    director: "Фрэнсис Форд Коппола",
    actors: "Марлон Брандо, Аль Пачино",
    runtime: "175 мин",
    released: "14 марта 1972",
    tmdbId: 238,
    mediaType: "movie",
    popularity: 131.476,
  },
  // Сериалы
  {
    id: "local-tv-1",
    title: "Во все тяжкие",
    originalTitle: "Breaking Bad",
    year: 2008,
    genre: ["Драма", "Криминал", "Триллер"],
    description:
      "Школьный учитель химии Уолтер Уайт узнаёт, что болен раком лёгких. Решив обеспечить будущее своей семьи, он начинает варить метамфетамин вместе со своим бывшим учеником Джесси Пинкманом.",
    posterUrl: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    isFavorite: false,
    rating: 9.5,
    director: "Винс Гиллиган",
    actors: "Брайан Крэнстон, Аарон Пол",
    runtime: "47 мин/эпизод",
    released: "20 января 2008",
    tmdbId: 1396,
    mediaType: "tv",
    seasons: 5,
    episodes: 62,
    popularity: 451.23,
  },
  {
    id: "local-tv-2",
    title: "Игра престолов",
    originalTitle: "Game of Thrones",
    year: 2011,
    genre: ["Драма", "Фэнтези", "Приключения"],
    description:
      "Несколько знатных семей сражаются за контроль над мифическими землями Вестероса, в то время как древний враг возвращается после тысячелетнего сна.",
    posterUrl: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/suopoADq0k2YZr4dQXcU6pToj6s.jpg",
    isFavorite: false,
    rating: 9.2,
    director: "Дэвид Бениофф, Д. Б. Вайсс",
    actors: "Эмилия Кларк, Кит Харингтон, Питер Динклэйдж",
    runtime: "57 мин/эпизод",
    released: "17 апреля 2011",
    tmdbId: 1399,
    mediaType: "tv",
    seasons: 8,
    episodes: 73,
    popularity: 369.594,
  },
  {
    id: "local-tv-3",
    title: "Шерлок",
    originalTitle: "Sherlock",
    year: 2010,
    genre: ["Драма", "Детектив", "Криминал"],
    description:
      "Современная адаптация рассказов Артура Конан Дойла о знаменитом детективе Шерлоке Холмсе, который решает преступления в современном Лондоне.",
    posterUrl: "https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/dGWcDKzNDdqw7bXKyONNYBDp4A8.jpg",
    isFavorite: false,
    rating: 9.1,
    director: "Марк Гэтисс, Стивен Моффат",
    actors: "Бенедикт Камбербэтч, Мартин Фриман",
    runtime: "90 мин/эпизод",
    released: "25 июля 2010",
    tmdbId: 19885,
    mediaType: "tv",
    seasons: 4,
    episodes: 13,
    popularity: 234.567,
  },
  // Добавляем больше разнообразного контента для демонстрации
  {
    id: "local-3",
    title: "Тёмный рыцарь",
    originalTitle: "The Dark Knight",
    year: 2008,
    genre: ["Боевик", "Криминал", "Драма"],
    description:
      "Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы от преступности.",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    isFavorite: false,
    rating: 9.0,
    director: "Кристофер Нолан",
    actors: "Кристиан Бэйл, Хит Леджер",
    runtime: "152 мин",
    released: "18 июля 2008",
    tmdbId: 155,
    mediaType: "movie",
    popularity: 123.167,
  },
  {
    id: "local-4",
    title: "Интерстеллар",
    originalTitle: "Interstellar",
    year: 2014,
    genre: ["Фантастика", "Драма", "Приключения"],
    description:
      "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей отправляется в путешествие.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    isFavorite: false,
    rating: 8.6,
    director: "Кристофер Нолан",
    actors: "Мэттью МакКонахи, Энн Хэтэуэй",
    runtime: "169 мин",
    released: "5 ноября 2014",
    tmdbId: 157336,
    mediaType: "movie",
    popularity: 95.234,
  },
  {
    id: "local-5",
    title: "Матрица",
    originalTitle: "The Matrix",
    year: 1999,
    genre: ["Боевик", "Фантастика"],
    description:
      "Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник, а ночью превращается в хакера по имени Нео.",
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    isFavorite: false,
    rating: 8.7,
    director: "Лана и Лилли Вачовски",
    actors: "Киану Ривз, Лоуренс Фишберн",
    runtime: "136 мин",
    released: "30 марта 1999",
    tmdbId: 603,
    mediaType: "movie",
    popularity: 87.456,
  },
  // Добавляем больше разнообразных фильмов
  {
    id: "local-6",
    title: "Форрест Гамп",
    originalTitle: "Forrest Gump",
    year: 1994,
    genre: ["Драма", "Мелодрама"],
    description: "История умственно отсталого парня Форреста, который случайным образом оказывается свидетелем и участником важнейших событий американской истории XX века.",
    posterUrl: "https://image.tmdb.org/t/p/w500/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/7c9UVPPiTPltouxRVY6N9uugaVA.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Роберт Земекис",
    actors: "Том Хэнкс, Робин Райт",
    runtime: "142 мин",
    released: "6 июля 1994",
    tmdbId: 13,
    mediaType: "movie",
    popularity: 65.843,
  },
  {
    id: "local-7",
    title: "Начало",
    originalTitle: "Inception",
    year: 2010,
    genre: ["Фантастика", "Боевик", "Триллер"],
    description: "Дом Кобб – талантливый вор, лучший в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна.",
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    isFavorite: false,
    rating: 8.4,
    director: "Кристофер Нолан",
    actors: "Леонардо ДиКаприо, Марион Котийяр",
    runtime: "148 мин",
    released: "16 июля 2010",
    tmdbId: 27205,
    mediaType: "movie",
    popularity: 96.321,
  },
  {
    id: "local-8",
    title: "Зеленая миля",
    originalTitle: "The Green Mile",
    year: 1999,
    genre: ["Драма", "Фэнтези", "Криминал"],
    description: "Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни.",
    posterUrl: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg",
    isFavorite: false,
    rating: 8.5,
    director: "Фрэнк Дарабонт",
    actors: "Том Хэнкс, Майкл Кларк Дункан",
    runtime: "189 мин",
    released: "10 декабря 1999",
    tmdbId: 497,
    mediaType: "movie",
    popularity: 73.219,
  },
  {
    id: "local-9",
    title: "Гладиатор",
    originalTitle: "Gladiator",
    year: 2000,
    genre: ["Боевик", "Драма", "Приключения"],
    description: "Римский генерал Максимус вынужден стать гладиатором. Оказавшись на арене, где решается его судьба, Максимус должен бороться за свою жизнь.",
    posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/5vZw7ltCKI0JiOYTtRxaIC3DX0e.jpg",
    isFavorite: false,
    rating: 8.5,
    director: "Ридли Скотт",
    actors: "Рассел Кроу, Хоакин Феникс",
    runtime: "155 мин",
    released: "5 мая 2000",
    tmdbId: 98,
    mediaType: "movie",
    popularity: 89.456,
  },
  {
    id: "local-10",
    title: "Список Шиндлера",
    originalTitle: "Schindler's List",
    year: 1993,
    genre: ["Драма", "История", "Военный"],
    description: "Фильм рассказывает реальную историю загадочного Оскара Шиндлера, члена нацистской партии, преуспевающего фабриканта, спасшего более тысячи евреев.",
    posterUrl: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg",
    isFavorite: false,
    rating: 9.0,
    director: "Стивен Спилберг",
    actors: "Лиам Нисон, Бен Кингсли",
    runtime: "195 мин",
    released: "30 ноября 1993",
    tmdbId: 424,
    mediaType: "movie",
    popularity: 78.342,
  },
  // Добавляем больше сериалов
  {
    id: "local-tv-4",
    title: "Очень странные дела",
    originalTitle: "Stranger Things",
    year: 2016,
    genre: ["Фантастика", "Драма", "Ужасы"],
    description: "1980-е годы, тихий провинциальный американский городок. Благоприятное течение местной жизни нарушает загадочное исчезновение подростка по имени Уилл.",
    posterUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    isFavorite: false,
    rating: 8.7,
    director: "Братья Даффер",
    actors: "Милли Бобби Браун, Финн Вулфхард",
    runtime: "50 мин/эпизод",
    released: "15 июля 2016",
    tmdbId: 66732,
    mediaType: "tv",
    seasons: 4,
    episodes: 42,
    popularity: 312.876,
  },
  {
    id: "local-tv-5",
    title: "Ведьмак",
    originalTitle: "The Witcher",
    year: 2019,
    genre: ["Фэнтези", "Драма", "Боевик"],
    description: "Ведьмак Геральт, мутант и убийца монстров, путешествует по континенту. На своем пути он встречает разных людей и ведьм, которые не всегда оказываются чудовищами.",
    posterUrl: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
    isFavorite: false,
    rating: 8.0,
    director: "Лорен Шмидт Хиссрич",
    actors: "Генри Кавилл, Аня Чалотра",
    runtime: "60 мин/эпизод",
    released: "20 декабря 2019",
    tmdbId: 71912,
    mediaType: "tv",
    seasons: 3,
    episodes: 24,
    popularity: 198.543,
  },
]

// Карта жанров TMDB на русском
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
  10770: "ТВ фильм",
  53: "Триллер",
  10752: "Военный",
  37: "Вестерн",
  // Жанры для сериалов
  10759: "Боевик и Приключения",
  10762: "Детские",
  10763: "Новости",
  10764: "Реалити-шоу",
  10765: "Фантастика и Фэнтези",
  10766: "Мыльная опера",
  10767: "Ток-шоу",
  10768: "Война и Политика",
}

class TMDBService {
  private cache = new Map<string, any>()
  private requestCount = 0
  private maxRequests = 900
  private apiKey: string
  private isApiWorking = false
  private lastApiCheck = 0
  private moviePool: Movie[] = [] // Пул фильмов для генерации уникального контента

  constructor() {
    this.apiKey = "3fd2be6f0c70a2a598f084ddfb75487c"
    this.isApiWorking = true
    this.initializeMoviePool()
  }

  // ИСПРАВЛЕНО: Инициализируем пул фильмов для генерации уникального контента
  private initializeMoviePool() {
    // Создаем большой пул разнообразных фильмов
    const baseMovies = [...localMovieDatabase]
    
    // Добавляем базовые фильмы
    this.moviePool = [...baseMovies]

    // Создаем только несколько вариаций для популярных фильмов
    const popularMovies = baseMovies
      .filter(movie => (movie.popularity || 0) > 100)
      .slice(0, 5)
    
    const variations = ["Режиссёрская версия", "Расширенная версия", "IMAX версия"]
    
    popularMovies.forEach((movie) => {
      variations.forEach((variation, varIndex) => {
        this.moviePool.push({
          ...movie,
          id: `${movie.id}-var-${varIndex}`,
          title: `${movie.title} (${variation})`,
          tmdbId: movie.tmdbId + (varIndex + 1) * 10000,
          popularity: (movie.popularity || 50) * 0.8,
          rating: movie.rating,
        })
      })
    })

    // Используем Fisher-Yates shuffle для настоящей рандомизации
    for (let i = this.moviePool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.moviePool[i], this.moviePool[j]] = [this.moviePool[j], this.moviePool[i]]
    }
    
    // console.log(`Инициализирован пул из ${this.moviePool.length} фильмов`)
  }

  // Проверка работоспособности API
  private async checkApiHealth(): Promise<boolean> {
    const now = Date.now()
    if (this.isApiWorking && now - this.lastApiCheck < 5 * 60 * 1000) {
      return true
    }

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${this.apiKey}&language=ru-RU`)
      const data = await response.json()

      this.lastApiCheck = now
      this.isApiWorking = response.ok && !data.status_code

      return this.isApiWorking
    } catch (error) {
      // console.error("Ошибка проверки TMDB API:", error)
      this.isApiWorking = false
      return false
    }
  }

  // Базовый запрос к TMDB API
  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    if (this.requestCount >= this.maxRequests) {
      throw new Error("Превышен лимит запросов к API")
    }

    const cacheKey = `${endpoint}-${JSON.stringify(params)}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const url = new URL(`https://api.themoviedb.org/3${endpoint}`)
    url.searchParams.append("api_key", this.apiKey)
    url.searchParams.append("language", "ru-RU")

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    try {
      this.requestCount++
      const response = await fetch(url.toString())

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.status_code) {
        throw new Error(data.status_message || "Ошибка API")
      }

      this.cache.set(cacheKey, data)
      setTimeout(() => this.cache.delete(cacheKey), 10 * 60 * 1000)

      return data
    } catch (error) {
      // console.error("Ошибка запроса к TMDB:", error)
      throw error
    }
  }

  // Поиск фильмов и сериалов
  async searchMovies(
    query: string,
    page = 1,
    mediaType: "all" | "movie" | "tv" = "all",
  ): Promise<{ movies: Movie[]; totalResults: number; source: "api" | "local" }> {
    if (!query.trim()) {
      return { movies: [], totalResults: 0, source: "local" }
    }

    const apiWorking = await this.checkApiHealth()

    if (apiWorking) {
      try {
        let endpoint = "/search/multi"
        if (mediaType === "movie") endpoint = "/search/movie"
        if (mediaType === "tv") endpoint = "/search/tv"

        const data: TMDBSearchResponse = await this.makeRequest(endpoint, {
          query: query,
          page: page.toString(),
          include_adult: "false",
        })

        const movies = data.results?.map((item) => this.convertTMDBToMovie(item)) || []
        const totalResults = data.total_results || 0

        return { movies, totalResults, source: "api" }
      } catch (error) {
        // console.error("Ошибка поиска через TMDB API:", error)
        this.isApiWorking = false
      }
    }

    return this.searchLocalMovies(query, mediaType)
  }

  // Поиск в локальной базе данных
  private searchLocalMovies(
    query: string,
    mediaType: "all" | "movie" | "tv" = "all",
  ): { movies: Movie[]; totalResults: number; source: "local" } {
    const searchLower = query.toLowerCase().trim()
    
    // Используем полный пул фильмов для поиска
    const searchPool = [...localMovieDatabase, ...this.moviePool]
    
    let results = searchPool.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchLower) ||
        (movie.originalTitle && movie.originalTitle.toLowerCase().includes(searchLower)) ||
        movie.description.toLowerCase().includes(searchLower) ||
        movie.genre.some(g => g.toLowerCase().includes(searchLower)) ||
        (movie.director && movie.director.toLowerCase().includes(searchLower)) ||
        (movie.actors && movie.actors.toLowerCase().includes(searchLower)),
    )

    // Фильтрация по типу медиа
    if (mediaType !== "all") {
      results = results.filter((movie) => movie.mediaType === mediaType)
    }
    
    // Удаляем дубликаты по tmdbId
    const uniqueResults = results.filter((movie, index, self) => 
      self.findIndex(m => m.tmdbId === movie.tmdbId) === index
    )
    
    // Сортируем по популярности
    uniqueResults.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

    return {
      movies: uniqueResults.slice(0, 50), // Ограничиваем результаты
      totalResults: uniqueResults.length,
      source: "local",
    }
  }

  // ИСПРАВЛЕНО: Получение популярных фильмов и сериалов без дублирования
  async getPopularMovies(
    mediaType: "all" | "movie" | "tv" = "all",
  ): Promise<{ movies: Movie[]; source: "api" | "local" }> {
    const apiWorking = await this.checkApiHealth()

    if (apiWorking) {
      try {
        const results: Movie[] = []

        if (mediaType === "all" || mediaType === "movie") {
          const movieData: TMDBSearchResponse = await this.makeRequest("/movie/popular", { page: "1" })
          const movies = movieData.results?.slice(0, 10).map((movie) => this.convertTMDBToMovie(movie)) || []
          results.push(...movies)
        }

        if (mediaType === "all" || mediaType === "tv") {
          const tvData: TMDBSearchResponse = await this.makeRequest("/tv/popular", { page: "1" })
          const tvShows = tvData.results?.slice(0, 10).map((tv) => this.convertTMDBToMovie(tv)) || []
          results.push(...tvShows)
        }

        if (results.length > 0) {
          return { movies: results, source: "api" }
        }
      } catch (error) {
        // console.error("Ошибка получения популярного контента:", error)
      }
    }

    // ИСПРАВЛЕНО: Используем полный пул фильмов для большего разнообразия
    let localResults = [...this.moviePool]
    if (mediaType !== "all") {
      localResults = localResults.filter((item) => item.mediaType === mediaType)
    }

    // Генерируем уникальный seed на основе времени для настоящей рандомизации
    const seed = Date.now()
    const shuffled = localResults
      .map((movie) => ({ movie, sort: Math.sin(seed + movie.tmdbId) }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ movie }) => movie)
    
    return { movies: shuffled.slice(0, 20), source: "local" }
  }

  // ИСПРАВЛЕНО: Получение дополнительного контента без дублирования
  async getMoreMovies(
    currentMovies: Movie[],
    mediaType: "all" | "movie" | "tv" = "all",
    page = 2,
  ): Promise<{ movies: Movie[]; source: "api" | "local" }> {
    // Получаем ID уже загруженных фильмов
    const existingIds = new Set(currentMovies.map((m) => m.tmdbId))

    // Фильтруем пул, исключая уже показанные фильмы
    let availableMovies = this.moviePool.filter((movie) => !existingIds.has(movie.tmdbId))

    if (mediaType !== "all") {
      availableMovies = availableMovies.filter((movie) => movie.mediaType === mediaType)
    }

    // Перемешиваем и берем следующие 20
    const shuffled = availableMovies.sort(() => 0.5 - Math.random())
    const newMovies = shuffled.slice(0, 20)

    // console.log(`Загружено ${newMovies.length} новых фильмов (страница ${page})`)

    return { movies: newMovies, source: "local" }
  }

  // Получение детальной информации
  async getMovieDetails(tmdbId: number, mediaType: "movie" | "tv"): Promise<Movie | null> {
    const apiWorking = await this.checkApiHealth()

    if (apiWorking) {
      try {
        const endpoint = mediaType === "movie" ? `/movie/${tmdbId}` : `/tv/${tmdbId}`
        const data: TMDBDetailResponse = await this.makeRequest(endpoint, {
          append_to_response: "credits",
        })

        return this.convertTMDBToMovie(data, true)
      } catch (error) {
        // console.error("Ошибка получения деталей:", error)
      }
    }

    const localItem =
      this.moviePool.find((item) => item.tmdbId === tmdbId) || localMovieDatabase.find((item) => item.tmdbId === tmdbId)
    return localItem || null
  }

  // Конвертация TMDB в наш формат
  private convertTMDBToMovie(tmdbItem: TMDBMovie | TMDBDetailResponse, isDetailed = false): Movie {
    const isTV = tmdbItem.media_type === "tv" || "name" in tmdbItem || "first_air_date" in tmdbItem
    const mediaType: "movie" | "tv" = isTV ? "tv" : "movie"

    const title = isTV
      ? tmdbItem.name || tmdbItem.title || "Без названия"
      : tmdbItem.title || tmdbItem.name || "Без названия"
    const originalTitle = isTV ? tmdbItem.original_name : tmdbItem.original_title

    const genres = tmdbItem.genre_ids
      ? tmdbItem.genre_ids.map((id) => genreMap[id] || "Неизвестно")
      : "genres" in tmdbItem && tmdbItem.genres
        ? tmdbItem.genres.map((g) => g.name)
        : ["Неизвестно"]

    const posterUrl = tmdbItem.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbItem.poster_path}`
      : `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(title)}`

    const backdropUrl = tmdbItem.backdrop_path
      ? `https://image.tmdb.org/t/p/original${tmdbItem.backdrop_path}`
      : undefined

    const releaseDate = isTV ? tmdbItem.first_air_date : tmdbItem.release_date
    const year = releaseDate ? new Date(releaseDate).getFullYear() : new Date().getFullYear()

    let director = undefined
    let actors = undefined
    let runtime = undefined

    if ("credits" in tmdbItem && tmdbItem.credits) {
      const directorObj = tmdbItem.credits.crew.find((person) => person.job === "Director" || person.job === "Creator")
      director = directorObj?.name

      const mainActors = tmdbItem.credits.cast.slice(0, 3).map((actor) => actor.name)
      actors = mainActors.length > 0 ? mainActors.join(", ") : undefined
    }

    if (isDetailed) {
      if (isTV && "episode_run_time" in tmdbItem && tmdbItem.episode_run_time?.length) {
        runtime = `${tmdbItem.episode_run_time[0]} мин/эпизод`
      } else if (!isTV && "runtime" in tmdbItem && tmdbItem.runtime) {
        runtime = `${tmdbItem.runtime} мин`
      }
    }

    const seasons = isTV && "number_of_seasons" in tmdbItem ? tmdbItem.number_of_seasons : undefined
    const episodes = isTV && "number_of_episodes" in tmdbItem ? tmdbItem.number_of_episodes : undefined

    return {
      id: `tmdb-${mediaType}-${tmdbItem.id}`,
      title,
      originalTitle,
      year,
      genre: genres,
      description: tmdbItem.overview || "Описание недоступно",
      posterUrl,
      backdropUrl,
      isFavorite: false,
      rating: tmdbItem.vote_average ? Number.parseFloat(tmdbItem.vote_average.toFixed(1)) : undefined,
      director,
      actors,
      runtime,
      released: releaseDate,
      tmdbId: tmdbItem.id,
      mediaType,
      seasons,
      episodes,
      popularity: tmdbItem.popularity,
    }
  }

  getApiStats() {
    return {
      requestCount: this.requestCount,
      remainingRequests: this.maxRequests - this.requestCount,
      cacheSize: this.cache.size,
      isApiWorking: this.isApiWorking,
      hasApiKey: true,
      moviePoolSize: this.moviePool.length,
    }
  }
  
  // Получить все фильмы из пула
  getAllMoviesFromPool(): Movie[] {
    return [...this.moviePool]
  }

  resetRequestCount() {
    this.requestCount = 0
  }

  // Перемешать пул фильмов для обновления контента
  reshuffleMoviePool() {
    // Используем Fisher-Yates shuffle для настоящей рандомизации
    const pool = [...this.moviePool]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]]
    }
    this.moviePool = pool
    // console.log("Пул фильмов перемешан")
  }
}

export const tmdbService = new TMDBService()
