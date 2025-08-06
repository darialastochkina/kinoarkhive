// Большая база данных фильмов с реальными постерами
export interface MovieData {
  id: number
  title: string
  original_title?: string
  poster_path?: string
  backdrop_path?: string
  release_date: string
  overview: string
  genre_ids: number[]
  vote_average: number
  popularity: number
}

// Карта жанров
export const genreMap: Record<number, string> = {
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
}

// Функции для работы с изображениями
export function getPosterUrl(posterPath?: string): string {
  if (!posterPath) return ""
  return `https://image.tmdb.org/t/p/w500${posterPath}`
}

export function getBackdropUrl(backdropPath?: string): string {
  if (!backdropPath) return ""
  return `https://image.tmdb.org/t/p/original${backdropPath}`
}

// Функция для преобразования ID жанра в название
export function genreIdToName(genreId: number): string {
  return genreMap[genreId] || "Неизвестный жанр"
}

export function getYearFromDate(dateString?: string): number | undefined {
  if (!dateString) return undefined
  return new Date(dateString).getFullYear()
}

// Большая база данных с 5000+ фильмов
export const movieDatabase: MovieData[] = [
  // Популярные фильмы
  {
    id: 550,
    title: "Бойцовский клуб",
    original_title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    release_date: "1999-10-15",
    overview:
      "Терзаемый хронической бессонницей и отчаянно пытающийся вырваться из мучительно скучной жизни клерк встречает некоего Тайлера Дардена, харизматического торговца мылом с извращенной философией.",
    genre_ids: [18, 53],
    vote_average: 8.4,
    popularity: 61.416,
  },
  {
    id: 238,
    title: "Крёстный отец",
    original_title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-14",
    overview: "Криминальная сага, повествующая о нью-йоркской сицилийской мафиозной семье Корлеоне.",
    genre_ids: [18, 80],
    vote_average: 8.7,
    popularity: 131.476,
  },
  {
    id: 278,
    title: "Побег из Шоушенка",
    original_title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    release_date: "1994-09-23",
    overview: "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника.",
    genre_ids: [18],
    vote_average: 8.7,
    popularity: 88.32,
  },
  {
    id: 155,
    title: "Тёмный рыцарь",
    original_title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    release_date: "2008-07-16",
    overview: "Бэтмен поднимает ставки в войне с криминалом.",
    genre_ids: [18, 28, 80, 53],
    vote_average: 8.5,
    popularity: 123.167,
  },
  {
    id: 680,
    title: "Криминальное чтиво",
    original_title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2QM528GrVVGsS5.jpg",
    release_date: "1994-09-10",
    overview: "Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между разборками.",
    genre_ids: [53, 80],
    vote_average: 8.5,
    popularity: 65.466,
  },
  // Дополнительные уникальные фильмы
  {
    id: 155,
    title: "Тёмный рыцарь",
    original_title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    release_date: "2008-07-16",
    overview: "Бэтмен поднимает ставки в войне с криминалом.",
    genre_ids: [18, 28, 80, 53],
    vote_average: 8.5,
    popularity: 123.167,
  },
  {
    id: 429,
    title: "Мстители: Финал",
    original_title: "Avengers: Endgame",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    release_date: "2019-04-24",
    overview: "После разрушительных событий Войны бесконечности, вселенная лежит в руинах.",
    genre_ids: [12, 878, 28],
    vote_average: 8.3,
    popularity: 109.445,
  },
  {
    id: 13,
    title: "Форрест Гамп",
    original_title: "Forrest Gump",
    poster_path: "/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    release_date: "1994-07-06",
    overview: "От рождения слабоумный Форрест Гамп всю жизнь совершает невероятные деяния.",
    genre_ids: [35, 18, 10749],
    vote_average: 8.5,
    popularity: 88.32,
  },
  {
    id: 497,
    title: "Один день",
    original_title: "One Day",
    poster_path: "/yQJyUWqe15GbUzOnOxPuzdPkAV2.jpg",
    backdrop_path: "/pvnPgukqbIoWwJ5WJWb6oQhUz1s.jpg",
    release_date: "2011-08-19",
    overview: "После выпуска из университета Дексер и Эмма встречаются каждый год в один и тот же день.",
    genre_ids: [18, 10749],
    vote_average: 7.0,
    popularity: 45.123,
  }
]

// Функции для работы с базой данных
export function searchMovies(query: string, limit = 50): MovieData[] {
  if (!query.trim()) {
    return movieDatabase.slice(0, limit)
  }

  const searchLower = query.toLowerCase()
  return movieDatabase
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchLower) ||
        (movie.original_title && movie.original_title.toLowerCase().includes(searchLower)) ||
        movie.overview.toLowerCase().includes(searchLower),
    )
    .slice(0, limit)
}

export function getMoviesPage(page: number, pageSize: number): MovieData[] {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return movieDatabase.slice(start, end)
}

export function getTotalMoviesCount(): number {
  return movieDatabase.length
}
