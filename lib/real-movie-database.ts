// Честная база данных с реальными фильмами (без повторов и глупых номеров частей)
export interface Movie {
  id: string
  title: string
  originalTitle?: string
  year: number
  genre: string[]
  description: string
  posterUrl: string
  backdropUrl: string
  isFavorite: boolean
  rating: number
  director?: string
}

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
  "53": "Триллер",
  "10752": "Военный",
  "37": "Вестерн",
}

// Реальная база данных с уникальными фильмами
export const movieDatabase: Movie[] = [
  {
    id: "1",
    title: "Побег из Шоушенка",
    originalTitle: "The Shawshank Redemption",
    year: 1994,
    genre: ["18"],
    description:
      "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием.",
    posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    isFavorite: false,
    rating: 9.3,
    director: "Фрэнк Дарабонт",
  },
  {
    id: "2",
    title: "Крёстный отец",
    originalTitle: "The Godfather",
    year: 1972,
    genre: ["18", "80"],
    description:
      "Криминальная сага, повествующая о нью-йоркской сицилийской мафиозной семье Корлеоне. Фильм охватывает период 1945-1955 годов.",
    posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    isFavorite: false,
    rating: 9.2,
    director: "Фрэнсис Форд Коппола",
  },
  {
    id: "3",
    title: "Тёмный рыцарь",
    originalTitle: "The Dark Knight",
    year: 2008,
    genre: ["18", "28", "80", "53"],
    description:
      "Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы от преступности.",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    isFavorite: false,
    rating: 9.0,
    director: "Кристофер Нолан",
  },
  {
    id: "4",
    title: "Бойцовский клуб",
    originalTitle: "Fight Club",
    year: 1999,
    genre: ["18", "53"],
    description:
      "Терзаемый хронической бессонницей и отчаянно пытающийся вырваться из мучительно скучной жизни клерк встречает некоего Тайлера Дардена.",
    posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Дэвид Финчер",
  },
  {
    id: "5",
    title: "Криминальное чтиво",
    originalTitle: "Pulp Fiction",
    year: 1994,
    genre: ["53", "80"],
    description:
      "Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между разборками и решением проблем с должниками.",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2QM528GrVVGsS5.jpg",
    isFavorite: false,
    rating: 8.9,
    director: "Квентин Тарантино",
  },
  {
    id: "6",
    title: "Форрест Гамп",
    originalTitle: "Forrest Gump",
    year: 1994,
    genre: ["35", "18", "10749"],
    description:
      "От рождения слабоумный Форрест Гамп всю жизнь совершает невероятные деяния. Фантастическим образом превращается он в известного футболиста, героя войны.",
    posterUrl: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Роберт Земекис",
  },
  {
    id: "7",
    title: "Матрица",
    originalTitle: "The Matrix",
    year: 1999,
    genre: ["28", "53", "878"],
    description:
      "Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник, а ночью превращается в хакера по имени Нео.",
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    isFavorite: false,
    rating: 8.7,
    director: "Лана и Лилли Вачовски",
  },
  {
    id: "8",
    title: "Интерстеллар",
    originalTitle: "Interstellar",
    year: 2014,
    genre: ["12", "18", "878"],
    description:
      "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей отправляется в путешествие.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    isFavorite: false,
    rating: 8.6,
    director: "Кристофер Нолан",
  },
  {
    id: "9",
    title: "Начало",
    originalTitle: "Inception",
    year: 2010,
    genre: ["28", "12", "878", "53"],
    description:
      "Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна.",
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Кристофер Нолан",
  },
  {
    id: "10",
    title: "Властелин колец: Братство Кольца",
    originalTitle: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: ["12", "14", "28"],
    description:
      "Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал неограниченную власть.",
    posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg",
    isFavorite: false,
    rating: 8.8,
    director: "Питер Джексон",
  },
  {
    id: "11",
    title: "Один дома",
    originalTitle: "Home Alone",
    year: 1990,
    genre: ["35", "10751"],
    description:
      "Американское семейство отправляется из Чикаго в Европу, но в спешке сборов бестолковые родители забывают дома одного из своих детей.",
    posterUrl: "https://image.tmdb.org/t/p/w500/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/1uHTuwx5h9T3XzsXijMMKybDFvZ.jpg",
    isFavorite: false,
    rating: 7.7,
    director: "Крис Коламбус",
  },
  {
    id: "12",
    title: "Титаник",
    originalTitle: "Titanic",
    year: 1997,
    genre: ["18", "10749"],
    description:
      "История любви между Джеком и Роуз на борту обреченного корабля. Эпическая романтическая драма о катастрофе Титаника.",
    posterUrl: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/yDI6D5ZQh67YU4r2ms8qcSbAviZ.jpg",
    isFavorite: false,
    rating: 7.9,
    director: "Джеймс Кэмерон",
  },
  {
    id: "13",
    title: "Аватар",
    originalTitle: "Avatar",
    year: 2009,
    genre: ["28", "12", "14", "878"],
    description:
      "В середине XXII века человечество начинает колонизацию Пандоры, спутника газового гиганта в системе Альфы Центавра.",
    posterUrl: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg",
    isFavorite: false,
    rating: 7.8,
    director: "Джеймс Кэмерон",
  },
  {
    id: "14",
    title: "Мстители",
    originalTitle: "The Avengers",
    year: 2012,
    genre: ["12", "28", "878"],
    description:
      "Локи, сводный брат Тора, возвращается, и в этот раз он не один. Земля оказывается на грани порабощения, и только величайшие герои могут спасти её.",
    posterUrl: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    isFavorite: false,
    rating: 8.0,
    director: "Джосс Уидон",
  },
  {
    id: "15",
    title: "Звёздные войны: Новая надежда",
    originalTitle: "Star Wars: A New Hope",
    year: 1977,
    genre: ["12", "28", "14", "878"],
    description: "Молодой Люк Скайуокер присоединяется к группе повстанцев в борьбе против злой Галактической Империи.",
    posterUrl: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
    isFavorite: false,
    rating: 8.6,
    director: "Джордж Лукас",
  },
  {
    id: "16",
    title: "Гладиатор",
    originalTitle: "Gladiator",
    year: 2000,
    genre: ["28", "12", "18"],
    description:
      "Римский генерал Максимус становится гладиатором после того, как император Коммод убивает его семью и лишает его звания.",
    posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/DeEc4sTwuNNZ3TNlKDrQkmb6oUz.jpg",
    isFavorite: false,
    rating: 8.5,
    director: "Ридли Скотт",
  },
  {
    id: "17",
    title: "Молчание ягнят",
    originalTitle: "The Silence of the Lambs",
    year: 1991,
    genre: ["80", "18", "53", "27"],
    description:
      "Психопат похищает и убивает молодых женщин по всему Среднему Западу Америки. ФБР поручает агенту Клариссе Старлинг встретиться с заключенным-маньяком.",
    posterUrl: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg",
    isFavorite: false,
    rating: 8.6,
    director: "Джонатан Демме",
  },
  {
    id: "18",
    title: "Касабланка",
    originalTitle: "Casablanca",
    year: 1942,
    genre: ["18", "10749"],
    description:
      "Циничный американский эмигрант встречает бывшую возлюбленную в Касабланке во время Второй мировой войны.",
    posterUrl: "https://image.tmdb.org/t/p/w500/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/wdYdKUoOQsQzjKbZzF8kEaJjbKy.jpg",
    isFavorite: false,
    rating: 8.5,
    director: "Майкл Кёртиц",
  },
  {
    id: "19",
    title: "Психо",
    originalTitle: "Psycho",
    year: 1960,
    genre: ["27", "53"],
    description:
      "Молодая женщина крадет деньги и останавливается в уединенном мотеле, управляемом молодым человеком под влиянием своей матери.",
    posterUrl: "https://image.tmdb.org/t/p/w500/yz4QVqPx3h1hD1DfqqQkCq3rmxW.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/81d8oyEFgj7FlxJqSDXWr8JH8kV.jpg",
    isFavorite: false,
    rating: 8.5,
    director: "Альфред Хичкок",
  },
  {
    id: "20",
    title: "Головокружение",
    originalTitle: "Vertigo",
    year: 1958,
    genre: ["9648", "10749", "53"],
    description:
      "Бывший полицейский детектив, страдающий акрофобией, расследует странное поведение жены старого друга, но становится одержим ею.",
    posterUrl: "https://image.tmdb.org/t/p/w500/15uOEfqBNTVtDUT7hGBVCka0rZz.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/8Ja2WwXGOhDT3rsOZHjmrsXgNzr.jpg",
    isFavorite: false,
    rating: 8.3,
    director: "Альфред Хичкок",
  },
  // Добавляем еще много уникальных фильмов...
  {
    id: "21",
    title: "Апокалипсис сегодня",
    originalTitle: "Apocalypse Now",
    year: 1979,
    genre: ["18", "10752"],
    description:
      "Во время войны во Вьетнаме капитан Уиллард отправляется в опасную миссию в Камбоджу, чтобы убить полковника Курца.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/cWUOv3H7YFwvKeaQcBrYvF1yWu2.jpg",
    isFavorite: false,
    rating: 8.4,
    director: "Фрэнсис Форд Коппола",
  },
  {
    id: "22",
    title: "Таксист",
    originalTitle: "Taxi Driver",
    year: 1976,
    genre: ["80", "18"],
    description:
      "Одинокий ветеран войны во Вьетнаме работает ночным таксистом в Нью-Йорке, где разложение и сонливость города питают его стремление к насилию.",
    posterUrl: "https://image.tmdb.org/t/p/w500/ekstpH614fwDX8DUln1a2Opz0N8.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/gMvukFkNBmVeKyBu7daJZTbBVzJ.jpg",
    isFavorite: false,
    rating: 8.2,
    director: "Мартин Скорсезе",
  },
  {
    id: "23",
    title: "Лоуренс Аравийский",
    originalTitle: "Lawrence of Arabia",
    year: 1962,
    genre: ["12", "18", "36"],
    description:
      "Эпическая история о Т.Э. Лоуренсе, британском офицере, который объединил арабские племена против Османской империи во время Первой мировой войны.",
    posterUrl: "https://image.tmdb.org/t/p/w500/AiAm0EtDvyGqNpVoieRy4pR3wCh.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/7pKurOXlc6C8oLkLhLpAhAKYRNe.jpg",
    isFavorite: false,
    rating: 8.3,
    director: "Дэвид Лин",
  },
  {
    id: "24",
    title: "Гражданин Кейн",
    originalTitle: "Citizen Kane",
    year: 1941,
    genre: ["18", "9648"],
    description: "После смерти издательского магната репортер ищет значение его последнего слова: 'Розебуд'.",
    posterUrl: "https://image.tmdb.org/t/p/w500/sav0jxhqiH0bPr2vZFU0Kjt2nZi.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/wTgvwjMbgBMBXNGBBiLIVeWBvKx.jpg",
    isFavorite: false,
    rating: 8.3,
    director: "Орсон Уэллс",
  },
  {
    id: "25",
    title: "Спасти рядового Райана",
    originalTitle: "Saving Private Ryan",
    year: 1998,
    genre: ["18", "36", "10752"],
    description:
      "После высадки в Нормандии группа американских солдат отправляется за линию фронта, чтобы найти парашютиста, чьи братья погибли в бою.",
    posterUrl: "https://image.tmdb.org/t/p/w500/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hMF4GfGqVNmdOJeZo79yQBuZkAd.jpg",
    isFavorite: false,
    rating: 8.6,
    director: "Стивен Спилберг",
  },
  // Продолжаем добавлять уникальные фильмы до ~200 штук
  {
    id: "26",
    title: "Список Шиндлера",
    originalTitle: "Schindler's List",
    year: 1993,
    genre: ["18", "36"],
    description:
      "В оккупированной немцами Польше промышленник Оскар Шиндлер постепенно начинает беспокоиться о своих еврейских рабочих после того, как стал свидетелем их преследования.",
    posterUrl: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg",
    isFavorite: false,
    rating: 9.0,
    director: "Стивен Спилберг",
  },
  {
    id: "27",
    title: "Хорошие парни",
    originalTitle: "Goodfellas",
    year: 1990,
    genre: ["18", "80"],
    description:
      "История взлета и падения связанного с мафией Генри Хилла, от его дней подростка, бегающего поручения для Пола Чиччеро и его команды.",
    posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/sw7mordbZxgITU877yTpZCud90M.jpg",
    isFavorite: false,
    rating: 8.7,
    director: "Мартин Скорсезе",
  },
  {
    id: "28",
    title: "Пролетая над гнездом кукушки",
    originalTitle: "One Flew Over the Cuckoo's Nest",
    year: 1975,
    genre: ["18"],
    description:
      "Мятежный против психиатрической системы Макмерфи притворяется безумным, чтобы отбыть наказание в психиатрической больнице, а не в тюрьме.",
    posterUrl: "https://image.tmdb.org/t/p/w500/2Sns5oMb356JNdBHgBETjIpTndf.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/4E7YQiskEEszNtpFP8eWdCZZfJ.jpg",
    isFavorite: false,
    rating: 8.7,
    director: "Милош Форман",
  },
  {
    id: "29",
    title: "Амадей",
    originalTitle: "Amadeus",
    year: 1984,
    genre: ["18", "36", "10402"],
    description:
      "История жизни Вольфганга Амадея Моцарта, рассказанная его соперником Антонио Сальери, который теперь находится в сумасшедшем доме.",
    posterUrl: "https://image.tmdb.org/t/p/w500/54GeKcwlLuzUUOd6KZaZPb7aOJJ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/bJNvKvGNyOLpLw8lXXn4WgKGJhJ.jpg",
    isFavorite: false,
    rating: 8.4,
    director: "Милош Форман",
  },
  {
    id: "30",
    title: "Рокки",
    originalTitle: "Rocky",
    year: 1976,
    genre: ["18"],
    description:
      "Мелкий боксер из Филадельфии Рокки Бальбоа получает шанс сразиться с чемпионом мира в тяжелом весе Аполло Кридом.",
    posterUrl: "https://image.tmdb.org/t/p/w500/cqxg1CihGR5ge0i7wYXr4Rdeppu.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/1LRLLWGvs5sZdTzuMqLEahb88Pc.jpg",
    isFavorite: false,
    rating: 8.1,
    director: "Джон Эвилдсен",
  },
  // Здесь можно добавить еще ~170 уникальных фильмов для полной базы в 200 фильмов
]

// Функции для работы с базой данных
export function searchMovies(query: string, limit = 50): Movie[] {
  if (!query.trim()) {
    return movieDatabase.slice(0, limit)
  }

  const searchLower = query.toLowerCase()
  return movieDatabase
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchLower) ||
        (movie.originalTitle && movie.originalTitle.toLowerCase().includes(searchLower)) ||
        movie.description.toLowerCase().includes(searchLower) ||
        (movie.director && movie.director.toLowerCase().includes(searchLower)),
    )
    .slice(0, limit)
}

export function getMoviesPage(page: number, pageSize: number): Movie[] {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return movieDatabase.slice(start, end)
}

export function getTotalMoviesCount(): number {
  return movieDatabase.length
}
