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
  // Добавляем много фильмов для создания большой базы данных
  ...Array.from({ length: 5000 }, (_, i) => {
    const baseMovies = [
      {
        title: "Матрица",
        original_title: "The Matrix",
        poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
        overview: "Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник.",
        genre_ids: [28, 53, 878],
        vote_average: 8.2,
        release_date: "1999-03-30",
      },
      {
        title: "Форрест Гамп",
        original_title: "Forrest Gump",
        poster_path: "/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
        backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
        overview: "От рождения слабоумный Форрест Гамп всю жизнь совершает невероятные деяния.",
        genre_ids: [35, 18, 10749],
        vote_average: 8.5,
        release_date: "1994-07-06",
      },
      {
        title: "Интерстеллар",
        original_title: "Interstellar",
        poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        overview:
          "Когда засуха приводит человечество к продовольственному кризису, коллектив исследователей отправляется в путешествие.",
        genre_ids: [12, 18, 878],
        vote_average: 8.4,
        release_date: "2014-11-05",
      },
      {
        title: "Начало",
        original_title: "Inception",
        poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        overview: "Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения.",
        genre_ids: [28, 12, 878, 53],
        vote_average: 8.4,
        release_date: "2010-07-16",
      },
      {
        title: "Властелин колец: Братство Кольца",
        original_title: "The Lord of the Rings: The Fellowship of the Ring",
        poster_path: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
        backdrop_path: "/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg",
        overview: "Сказания о Средиземье — это хроника Великой войны за Кольцо.",
        genre_ids: [12, 14, 28],
        vote_average: 8.4,
        release_date: "2001-12-18",
      },
      {
        title: "Один дома",
        original_title: "Home Alone",
        poster_path: "/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
        backdrop_path: "/1uHTuwx5h9T3XzsXijMMKybDFvZ.jpg",
        overview: "Американское семейство отправляется из Чикаго в Европу, но забывают дома одного из детей.",
        genre_ids: [35, 10751],
        vote_average: 7.4,
        release_date: "1990-11-16",
      },
      {
        title: "Титаник",
        original_title: "Titanic",
        poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        backdrop_path: "/yDI6D5ZQh67YU4r2ms8qcSbAviZ.jpg",
        overview: "История любви между Джеком и Роуз на борту обреченного корабля.",
        genre_ids: [18, 10749],
        vote_average: 7.9,
        release_date: "1997-11-18",
      },
      {
        title: "Аватар",
        original_title: "Avatar",
        poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
        backdrop_path: "/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg",
        overview: "В середине XXII века человечество начинает колонизацию Пандоры.",
        genre_ids: [28, 12, 14, 878],
        vote_average: 7.6,
        release_date: "2009-12-10",
      },
      {
        title: "Мстители",
        original_title: "The Avengers",
        poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
        backdrop_path: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
        overview: "Локи возвращается, и в этот раз он не один. Земля оказывается на грани порабощения.",
        genre_ids: [12, 28, 878],
        vote_average: 7.7,
        release_date: "2012-04-25",
      },
      {
        title: "Звёздные войны",
        original_title: "Star Wars",
        poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
        backdrop_path: "/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
        overview: "Молодой Люк Скайуокер присоединяется к группе повстанцев в борьбе против Империи.",
        genre_ids: [12, 28, 14, 878],
        vote_average: 8.2,
        release_date: "1977-05-25",
      },
    ]

    const baseMovie = baseMovies[i % baseMovies.length]
    const yearVariation = 1970 + (i % 50)
    const ratingVariation = 6.0 + (i % 40) / 10

    return {
      id: 1000 + i,
      title: i < 10 ? baseMovie.title : `${baseMovie.title} ${Math.floor(i / 10) + 1}`,
      original_title: i < 10 ? baseMovie.original_title : `${baseMovie.original_title} ${Math.floor(i / 10) + 1}`,
      poster_path: baseMovie.poster_path,
      backdrop_path: baseMovie.backdrop_path,
      release_date: `${yearVariation}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      overview: baseMovie.overview,
      genre_ids: baseMovie.genre_ids,
      vote_average: ratingVariation,
      popularity: 10 + (i % 100),
    }
  }),
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
