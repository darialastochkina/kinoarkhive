import type { Movie } from "@/lib/tmdb-service"

// Карта жанров
export const genreMap: Record<string, string> = {
  "28": "Боевик",
  "12": "Приключения", 
  "16": "Мультфильм",
  "35": "Комедия",
  "80": "Криминал",
  "99": "Документальный",
  "18": "Драма",
  "10751": "Семейный",
  "14": "Фэнтези",
  "36": "История",
  "27": "Ужасы",
  "10402": "Музыка",
  "9648": "Детектив",
  "10749": "Мелодрама",
  "878": "Фантастика",
  "10770": "ТВ фильм",
  "53": "Триллер",
  "10752": "Военный",
  "37": "Вестерн",
}

// База данных реальных фильмов
export const realMovies: Movie[] = [
  {
    id: "550",
    title: "Бойцовский клуб",
    originalTitle: "Fight Club",
    year: 1999,
    genre: ["18", "53"],
    description:
      "Терзаемый хронической бессонницей и отчаянно пытающийся вырваться из мучительно скучной жизни клерк встречает некоего Тайлера Дардена, харизматического торговца мылом с извращенной философией.",
    posterUrl: "https://image.tmdb.org/t/p/w500/tB2ITHg556e7aTV6cqQqVAZYOgN.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    isFavorite: false,
    rating: 9.2,
    tmdbId: 550,
    mediaType: "movie" as const,
  },
  {
    id: "238",
    title: "Крёстный отец",
    originalTitle: "The Godfather",
    year: 1972,
    genre: ["18", "80"],
    description:
      "Криминальная сага, повествующая о нью-йоркской сицилийской мафиозной семье Корлеоне.",
    posterUrl: "https://image.tmdb.org/t/p/w500/eEslKSwcqmiNS6va24Pbxf2UKmJ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    isFavorite: false,
    rating: 9.5,
    tmdbId: 238,
    mediaType: "movie" as const,
  },
  {
    id: "155",
    title: "Тёмный рыцарь",
    originalTitle: "The Dark Knight",
    year: 2008,
    genre: ["18", "28", "80", "53"],
    description:
      "Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы от преступности.",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    isFavorite: false,
    rating: 9.3,
    tmdbId: 155,
    mediaType: "movie" as const,
  },
]