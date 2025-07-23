// Сервис для работы с OMDB API с fallback к локальной базе
export interface OMDBMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Plot?: string
  Director?: string
  Actors?: string
  Genre?: string
  imdbRating?: string
  Runtime?: string
  Released?: string
  Writer?: string
  Language?: string
  Country?: string
  Awards?: string
}

export interface OMDBSearchResponse {
  Search: OMDBMovie[]
  totalResults: string
  Response: string
  Error?: string
}

export interface OMDBDetailResponse extends OMDBMovie {
  Response: string
  Error?: string
}

// Наш внутренний тип фильма
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
  imdbId: string
}

// Локальная база данных фильмов (fallback)
const localMovieDatabase: Movie[] = [
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
    awards: "Номинирован на 7 Оскаров",
    imdbId: "tt0111161",
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
    awards: "3 Оскара, включая Лучший фильм",
    imdbId: "tt0068646",
  },
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
    awards: "2 Оскара, включая посмертный Оскар Хита Леджера",
    imdbId: "tt0468569",
  },
  {
    id: "local-4",
    title: "Бойцовский клуб",
    originalTitle: "Fight Club",
    year: 1999,
    genre: ["Драма", "Триллер"],
    description:
      "Терзаемый хронической бессонницей и отчаянно пытающийся вырваться из мучительно скучной жизни клерк встречает некоего Тайлера Дардена.",
    posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Дэвид Финчер",
    actors: "Брэд Питт, Эдвард Нортон",
    runtime: "139 мин",
    released: "15 октября 1999",
    awards: "Номинирован на Оскар за лучшие спецэффекты",
    imdbId: "tt0137523",
  },
  {
    id: "local-5",
    title: "Форрест Гамп",
    originalTitle: "Forrest Gump",
    year: 1994,
    genre: ["Драма", "Комедия", "Мелодрама"],
    description:
      "От рождения слабоумный Форрест Гамп всю жизнь совершает невероятные деяния. Фантастическим образом превращается он в известного футболиста, героя войны.",
    posterUrl: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Роберт Земекис",
    actors: "Том Хэнкс, Робин Райт",
    runtime: "142 мин",
    released: "6 июля 1994",
    awards: "6 Оскаров, включая Лучший фильм",
    imdbId: "tt0109830",
  },
  {
    id: "local-6",
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
    awards: "4 Оскара за технические достижения",
    imdbId: "tt0133093",
  },
  {
    id: "local-7",
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
    awards: "Оскар за лучшие визуальные эффекты",
    imdbId: "tt0816692",
  },
  {
    id: "local-8",
    title: "Начало",
    originalTitle: "Inception",
    year: 2010,
    genre: ["Боевик", "Фантастика", "Триллер"],
    description:
      "Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна.",
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Кристофер Нолан",
    actors: "Леонардо ДиКаприо, Марион Котийяр",
    runtime: "148 мин",
    released: "16 июля 2010",
    awards: "4 Оскара за технические достижения",
    imdbId: "tt1375666",
  },
  {
    id: "local-9",
    title: "Властелин колец: Братство Кольца",
    originalTitle: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: ["Приключения", "Фэнтези"],
    description: "Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет.",
    posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Питер Джексон",
    actors: "Элайджа Вуд, Иэн МакКеллен",
    runtime: "178 мин",
    released: "19 декабря 2001",
    awards: "4 Оскара из 13 номинаций",
    imdbId: "tt0120737",
  },
  {
    id: "local-10",
    title: "Криминальное чтиво",
    originalTitle: "Pulp Fiction",
    year: 1994,
    genre: ["Криминал", "Драма"],
    description:
      "Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между разборками и решением проблем с должниками.",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2QM528GrVVGsS5.jpg",
    isFavorite: false,
    rating: 8.9,
    director: "Квентин Тарантино",
    actors: "Джон Траволта, Сэмюэл Л. Джексон",
    runtime: "154 мин",
    released: "14 октября 1994",
    awards: "Оскар за лучший оригинальный сценарий",
    imdbId: "tt0110912",
  },
  {
    id: "local-11",
    title: "Гладиатор",
    originalTitle: "Gladiator",
    year: 2000,
    genre: ["Боевик", "Драма", "Приключения"],
    description:
      "Римский генерал Максимус становится гладиатором после того, как император Коммод убивает его семью и лишает его звания.",
    posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/DeEc4sTwuNNZ3TNlKDrQkmb6oUz.jpg",
    isFavorite: false,
    rating: 8.5,
    director: "Ридли Скотт",
    actors: "Рассел Кроу, Хоакин Феникс",
    runtime: "155 мин",
    released: "5 мая 2000",
    awards: "5 Оскаров, включая Лучший фильм",
    imdbId: "tt0172495",
  },
  {
    id: "local-12",
    title: "Титаник",
    originalTitle: "Titanic",
    year: 1997,
    genre: ["Драма", "Мелодрама"],
    description:
      "История любви между Джеком и Роуз на борту обреченного корабля. Эпическая романтическая драма о катастрофе Титаника.",
    posterUrl: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/yDI6D5ZQh67YU4r2ms8qcSbAviZ.jpg",
    isFavorite: false,
    rating: 7.9,
    director: "Джеймс Кэмерон",
    actors: "Леонардо ДиКаприо, Кейт Уинслет",
    runtime: "194 мин",
    released: "19 декабря 1997",
    awards: "11 Оскаров, включая Лучший фильм",
    imdbId: "tt0120338",
  },
  {
    id: "local-13",
    title: "Звёздные войны: Новая надежда",
    originalTitle: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    genre: ["Приключения", "Фантастика"],
    description: "Молодой Люк Скайуокер присоединяется к группе повстанцев в борьбе против злой Галактической Империи.",
    posterUrl: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
    isFavorite: false,
    rating: 8.6,
    director: "Джордж Лукас",
    actors: "Марк Хэмилл, Харрисон Форд",
    runtime: "121 мин",
    released: "25 мая 1977",
    awards: "7 Оскаров за технические достижения",
    imdbId: "tt0076759",
  },
  {
    id: "local-14",
    title: "Мстители",
    originalTitle: "The Avengers",
    year: 2012,
    genre: ["Боевик", "Приключения", "Фантастика"],
    description:
      "Локи, сводный брат Тора, возвращается, и в этот раз он не один. Земля оказывается на грани порабощения.",
    posterUrl: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    isFavorite: false,
    rating: 8.0,
    director: "Джосс Уидон",
    actors: "Роберт Дауни мл., Крис Эванс",
    runtime: "143 мин",
    released: "4 мая 2012",
    awards: "Номинирован на Оскар за лучшие визуальные эффекты",
    imdbId: "tt0848228",
  },
  {
    id: "local-15",
    title: "Один дома",
    originalTitle: "Home Alone",
    year: 1990,
    genre: ["Комедия", "Семейный"],
    description:
      "Американское семейство отправляется из Чикаго в Европу, но в спешке сборов бестолковые родители забывают дома одного из своих детей.",
    posterUrl: "https://image.tmdb.org/t/p/w500/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/1uHTuwx5h9T3XzsXijMMKybDFvZ.jpg",
    isFavorite: false,
    rating: 7.7,
    director: "Крис Коламбус",
    actors: "Маколей Калкин, Джо Пеши",
    runtime: "103 мин",
    released: "16 ноября 1990",
    awards: "Номинирован на 2 Оскара",
    imdbId: "tt0099785",
  },
]

// Карта жанров для русского языка
const genreTranslations: Record<string, string> = {
  Action: "Боевик",
  Adventure: "Приключения",
  Animation: "Мультфильм",
  Biography: "Биография",
  Comedy: "Комедия",
  Crime: "Криминал",
  Documentary: "Документальный",
  Drama: "Драма",
  Family: "Семейный",
  Fantasy: "Фэнтези",
  "Film-Noir": "Нуар",
  History: "История",
  Horror: "Ужасы",
  Music: "Музыка",
  Musical: "Мюзикл",
  Mystery: "Детектив",
  Romance: "Мелодрама",
  "Sci-Fi": "Фантастика",
  Sport: "Спорт",
  Thriller: "Триллер",
  War: "Военный",
  Western: "Вестерн",
}

class OMDBService {
  private cache = new Map<string, any>()
  private requestCount = 0
  private maxRequests = 900
  private apiKey: string | null = null
  private isApiWorking = false
  private lastApiCheck = 0

  constructor() {
    // Используем встроенный API ключ по умолчанию
    this.apiKey = "d3c9d2fd"
    this.isApiWorking = true // Предполагаем что ключ рабочий

    // Также проверяем localStorage на случай если пользователь хочет использовать свой ключ
    if (typeof window !== 'undefined') {
      const userKey = localStorage.getItem("omdb_api_key")
      if (userKey && userKey !== this.apiKey) {
        this.apiKey = userKey
        this.isApiWorking = false // Нужно будет проверить пользовательский ключ
      }
    }
  }

  // Установка API ключа
  setApiKey(key: string) {
    this.apiKey = key
    if (typeof window !== 'undefined') {
      localStorage.setItem("omdb_api_key", key)
    }
    this.isApiWorking = false // Сбрасываем статус, чтобы проверить новый ключ
  }

  // Получение API ключа
  getApiKey(): string | null {
    return this.apiKey
  }

  // Проверка работоспособности API
  private async checkApiHealth(): Promise<boolean> {
    const now = Date.now()
    // Проверяем не чаще чем раз в 5 минут
    if (this.isApiWorking && now - this.lastApiCheck < 5 * 60 * 1000) {
      return true
    }

    if (!this.apiKey) {
      return false
    }

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&t=batman&y=2008`)
      const data = await response.json()

      this.lastApiCheck = now
      this.isApiWorking = (response.ok && data.Response !== "False") || data.Error !== "Invalid API key!"

      return this.isApiWorking
    } catch (error) {
      console.error("Ошибка проверки API:", error)
      this.isApiWorking = false
      return false
    }
  }

  // Базовый запрос к OMDB API
  private async makeRequest(params: Record<string, string>): Promise<any> {
    if (!this.apiKey) {
      throw new Error("API ключ не установлен")
    }

    if (this.requestCount >= this.maxRequests) {
      throw new Error("Превышен лимит запросов к API")
    }

    const cacheKey = JSON.stringify(params)
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const url = new URL("https://www.omdbapi.com/")
    url.searchParams.append("apikey", this.apiKey)

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

      if (data.Response === "False") {
        throw new Error(data.Error || "Ошибка API")
      }

      // Кешируем результат на 5 минут
      this.cache.set(cacheKey, data)
      setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000)

      return data
    } catch (error) {
      console.error("Ошибка запроса к OMDB:", error)
      throw error
    }
  }

  // Поиск фильмов с fallback к локальной базе
  async searchMovies(
    query: string,
    page = 1,
  ): Promise<{ movies: Movie[]; totalResults: number; source: "api" | "local" }> {
    if (!query.trim()) {
      return { movies: [], totalResults: 0, source: "local" }
    }

    // Сначала пробуем API
    const apiWorking = await this.checkApiHealth()

    if (apiWorking) {
      try {
        const data: OMDBSearchResponse = await this.makeRequest({
          s: query,
          type: "movie",
          page: page.toString(),
        })

        const movies = data.Search?.map((movie) => this.convertOMDBToMovie(movie)) || []
        const totalResults = Number.parseInt(data.totalResults) || 0

        return { movies, totalResults, source: "api" }
      } catch (error) {
        console.error("Ошибка поиска через API, переключаемся на локальную базу:", error)
        this.isApiWorking = false
      }
    }

    // Fallback к локальной базе данных
    return this.searchLocalMovies(query)
  }

  // Поиск в локальной базе данных
  private searchLocalMovies(query: string): { movies: Movie[]; totalResults: number; source: "local" } {
    const searchLower = query.toLowerCase()
    const results = localMovieDatabase.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchLower) ||
        (movie.originalTitle && movie.originalTitle.toLowerCase().includes(searchLower)) ||
        movie.description.toLowerCase().includes(searchLower) ||
        (movie.director && movie.director.toLowerCase().includes(searchLower)) ||
        (movie.actors && movie.actors.toLowerCase().includes(searchLower)),
    )

    return {
      movies: results,
      totalResults: results.length,
      source: "local",
    }
  }

  // Получение детальной информации о фильме
  async getMovieDetails(imdbId: string): Promise<Movie | null> {
    const apiWorking = await this.checkApiHealth()

    if (apiWorking) {
      try {
        const data: OMDBDetailResponse = await this.makeRequest({
          i: imdbId,
          plot: "full",
        })

        return this.convertOMDBToMovie(data, true)
      } catch (error) {
        console.error("Ошибка получения деталей через API:", error)
      }
    }

    // Fallback к локальной базе
    const localMovie = localMovieDatabase.find((movie) => movie.imdbId === imdbId)
    return localMovie || null
  }

  // Получение популярных фильмов
  async getPopularMovies(): Promise<{ movies: Movie[]; source: "api" | "local" }> {
    const apiWorking = await this.checkApiHealth()

    if (apiWorking) {
      const popularQueries = ["Marvel", "Batman", "Star Wars"]
      const allMovies: Movie[] = []

      try {
        for (const query of popularQueries) {
          const { movies } = await this.searchMovies(query, 1)
          allMovies.push(...movies.slice(0, 3))
        }

        if (allMovies.length > 0) {
          const uniqueMovies = allMovies.filter(
            (movie, index, self) => index === self.findIndex((m) => m.imdbId === movie.imdbId),
          )
          return { movies: uniqueMovies.slice(0, 15), source: "api" }
        }
      } catch (error) {
        console.error("Ошибка получения популярных фильмов через API:", error)
      }
    }

    // Fallback к локальной базе
    return { movies: localMovieDatabase.slice(0, 15), source: "local" }
  }

  // Конвертация OMDB фильма в наш формат
  private convertOMDBToMovie(omdbMovie: OMDBMovie, isDetailed = false): Movie {
    const genres = omdbMovie.Genre
      ? omdbMovie.Genre.split(", ").map((genre) => genreTranslations[genre] || genre)
      : ["Неизвестно"]

    const posterUrl =
      omdbMovie.Poster && omdbMovie.Poster !== "N/A"
        ? omdbMovie.Poster
        : `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(omdbMovie.Title)}`

    const rating =
      omdbMovie.imdbRating && omdbMovie.imdbRating !== "N/A" ? Number.parseFloat(omdbMovie.imdbRating) : undefined

    const year = Number.parseInt(omdbMovie.Year) || new Date().getFullYear()

    return {
      id: `omdb-${omdbMovie.imdbID}`,
      title: omdbMovie.Title,
      originalTitle: omdbMovie.Title,
      year,
      genre: genres,
      description: omdbMovie.Plot && omdbMovie.Plot !== "N/A" ? omdbMovie.Plot : "Описание недоступно",
      posterUrl,
      backdropUrl: posterUrl,
      isFavorite: false,
      rating,
      director: omdbMovie.Director && omdbMovie.Director !== "N/A" ? omdbMovie.Director : undefined,
      actors: omdbMovie.Actors && omdbMovie.Actors !== "N/A" ? omdbMovie.Actors : undefined,
      runtime: omdbMovie.Runtime && omdbMovie.Runtime !== "N/A" ? omdbMovie.Runtime : undefined,
      released: omdbMovie.Released && omdbMovie.Released !== "N/A" ? omdbMovie.Released : undefined,
      awards: omdbMovie.Awards && omdbMovie.Awards !== "N/A" ? omdbMovie.Awards : undefined,
      imdbId: omdbMovie.imdbID,
    }
  }

  // Получение статистики использования API
  getApiStats() {
    return {
      requestCount: this.requestCount,
      remainingRequests: this.maxRequests - this.requestCount,
      cacheSize: this.cache.size,
      isApiWorking: this.isApiWorking,
      hasApiKey: !!this.apiKey,
    }
  }

  // Сброс счетчика запросов
  resetRequestCount() {
    this.requestCount = 0
  }
}

// Создаем и экспортируем экземпляр сервиса
export const omdbService = new OMDBService()
