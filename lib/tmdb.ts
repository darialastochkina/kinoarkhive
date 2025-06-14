// Константы для работы с TMDB API
const TMDB_API_KEY = "3d9f6ef05faa3072ee4095e9b5fac074" // Это публичный ключ для демонстрации
const TMDB_API_URL = "https://api.themoviedb.org/3"

// Карта жанров TMDB
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
}

// Расширенная база фильмов для поиска
const movieDatabase = [
  {
    id: 550,
    title: "Бойцовский клуб",
    poster_path: "/tB2ITHg556e7aTV6cqQqVAZYOgN.jpg",
    backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    release_date: "1999-10-15",
    overview:
      "Терзаемый хронической бессонницей и отчаянно пытающийся вырваться из мучительно скучной жизни клерк встречает некоего Тайлера Дардена, харизматического торговца мылом с извращенной философией. Тайлер уверен, что самосовершенствование — для слабаков, а саморазрушение — единственное, ради чего стоит жить.",
    genre_ids: [18, 53],
  },
  {
    id: 238,
    title: "Крёстный отец",
    poster_path: "/eEslKSwcqmiNS6va24Pbxf2UKmJ.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-14",
    overview:
      "Криминальная сага, повествующая о нью-йоркской сицилийской мафиозной семье Корлеоне. Фильм охватывает период 1945-1955 годов. Глава семьи, Дон Вито Корлеоне, выдаёт замуж свою дочь. В это время со Второй мировой войны возвращается его любимый сын Майкл. Майкл, герой войны, гордость семьи, не выражает желания заняться жестоким семейным бизнесом. Дон Корлеоне ведёт дела по старым правилам, но наступают иные времена, и появляются люди, желающие изменить сложившиеся порядки. На Дона Корлеоне совершается покушение.",
    genre_ids: [18, 80],
  },
  {
    id: 429,
    title: "Хороший, плохой, злой",
    poster_path: "/6B5bTuZEyLUBm9QGzKca3RKt6hN.jpg",
    backdrop_path: "/2YuO9pHNJwUzMJN2zIsWCGpyGgj.jpg",
    release_date: "1966-12-23",
    overview:
      "В разгар гражданской войны таинственный стрелок скитается по просторам Дикого Запада. У него нет ни дома, ни друзей, ни компаньонов, пока он не встречает двоих незнакомцев, таких же безжалостных и циничных. По воле судьбы трое мужчин вынуждены объединить свои усилия в поисках украденного золота. Но совместная работа — не самое подходящее занятие для таких отъявленных бандитов, как они. Компаньоны вскоре понимают, что в их дерзком и опасном путешествии по разоренной войной стране самое важное — никому не доверять и держать пистолет наготове, если хочешь остаться в живых.",
    genre_ids: [37],
  },
  {
    id: 155,
    title: "Тёмный рыцарь",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    release_date: "2008-07-16",
    overview:
      "Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы от преступности, отравляющей город. Сотрудничество оказывается эффективным, но скоро они обнаружат себя посреди хаоса, развязанного восходящим криминальным гением, известным испуганным горожанам под именем Джокер.",
    genre_ids: [18, 28, 80, 53],
  },
  {
    id: 13,
    title: "Форрест Гамп",
    poster_path: "/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    release_date: "1994-07-06",
    overview:
      "От рождения слабоумный Форрест Гамп всю жизнь совершает невероятные деяния. Фантастическим образом превращается он в известного футболиста, героя войны, преуспевающего бизнесмена. Он становится миллиардером, но остается таким же бесхитростным, глупым и добрым. Форреста ждет постоянный успех во всем, а он любит девочку, с которой дружил в детстве, но взаимность приходит слишком поздно.",
    genre_ids: [35, 18, 10749],
  },
  {
    id: 11216,
    title: "Престиж",
    poster_path: "/5MXyQfz8xUP3dIFPTubhTsbFY6N.jpg",
    backdrop_path: "/tMaGZ2HR8HAFwkx4YUqSFVtT6Bl.jpg",
    release_date: "2006-10-19",
    overview:
      "Роберт и Альфред — фокусники-иллюзионисты, которые на рубеже XIX и XX веков соперничали друг с другом в Лондоне. С годами их дружеская конкуренция на профессиональной почве перерастает в настоящую войну.",
    genre_ids: [18, 9648, 53],
  },
  {
    id: 680,
    title: "Криминальное чтиво",
    poster_path: "/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    backdrop_path: "/suaEOtk1N1sgg2QM528GrVVGsS5.jpg",
    release_date: "1994-09-10",
    overview:
      "Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между разборками и решением проблем с должниками криминального босса Марселласа Уоллеса. В первой истории Винсент проводит незабываемый вечер с женой Марселласа Мией. Во второй рассказывается о боксёре Бутче Кулидже, купленном Уоллесом, чтобы сдать бой. В третьей истории Винсент и Джулс по нелепой случайности попадают в неприятности.",
    genre_ids: [53, 80],
  },
  {
    id: 122,
    title: "Властелин колец: Возвращение короля",
    poster_path: "/kKlTFL9hP7ZUMvNcUaKbhJJVGY5.jpg",
    backdrop_path: "/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg",
    release_date: "2003-12-01",
    overview:
      "Повелитель сил тьмы Саурон направляет свою бесчисленную армию под стены Минас-Тирита, крепости Последней Надежды. Он предвкушает близкую победу, но именно это мешает ему заметить две крохотные фигурки — хоббитов, приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо Всевластья.",
    genre_ids: [12, 14, 28],
  },
  {
    id: 769,
    title: "Красота по-американски",
    poster_path: "/wby9315QzVKdW9BonAIZtJcgNMq.jpg",
    backdrop_path: "/3Kgu3ys6W6UZWWFWdYB3kAETEgS.jpg",
    release_date: "1999-09-15",
    overview:
      "Лестер Бернэм переживает кризис среднего возраста. Его не уважают и не ценят на работе, а от счастливой семьи осталась лишь видимость. У жены Кэролайн страстный роман с коллегой по работе, а угрюмая дочь-подросток Джейн увлечена соседским парнем, побочно торгующим наркотиками и снимающим всё подряд на видеокамеру. Терзаемый душевными муками Лестер впадает в нелепую юношескую влюбленность в одноклассницу дочери Анджелу. И эта страсть дает разрядку внутреннему напряжению и толчок к изменениям.",
    genre_ids: [18],
  },
  {
    id: 274,
    title: "Молчание ягнят",
    poster_path: "/dXltzHaVMTz2Wc9GVn2Y8qQmrNP.jpg",
    backdrop_path: "/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg",
    release_date: "1991-02-01",
    overview:
      "Психопат похищает и убивает молодых женщин по всему Среднему Западу Америки. ФБР, уверенное в том, что все преступления совершены одним и тем же человеком, поручает агенту Клариссе Старлинг встретиться с заключенным-маньяком, который мог бы объяснить следствию психологические мотивы серийного убийцы и тем самым вывести на его след.",
    genre_ids: [80, 18, 53, 27],
  },
  {
    id: 603,
    title: "Матрица",
    poster_path: "/lZpvHaRDSNqAEYUgaJed65KVvLi.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    release_date: "1999-03-30",
    overview:
      "Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник, получающий нагоняи от начальства, а ночью превращается в хакера по имени Нео, и нет места в сети, куда он бы не смог проникнуть. Но однажды всё меняется. Томас узнаёт ужасающую правду о реальности.",
    genre_ids: [28, 53, 878],
  },
  {
    id: 9428,
    title: "Маленькие женщины",
    poster_path: "/9lODAUWkQBdj4ADUzwvkVGXkbDh.jpg",
    backdrop_path: "/3uTxPIdVEXxHpsHOHdJC24QebBV.jpg",
    release_date: "2019-12-25",
    overview:
      "Фильм рассказывает о взрослении четырех непохожих друг на друга сестер. Действие разворачивается во времена Гражданской войны в США, но проблемы, с которыми сталкиваются девушки, актуальны как никогда: первая любовь, горькое разочарование, томительная разлука и непростые поиски себя и своего места в жизни.",
    genre_ids: [18, 10749],
  },
  {
    id: 157336,
    title: "Интерстеллар",
    poster_path: "/r7AAFgo4qsQj9VTMPbXIywSK9Tm.jpg",
    backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    release_date: "2014-11-05",
    overview:
      "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.",
    genre_ids: [12, 18, 878],
  },
  {
    id: 496243,
    title: "Паразиты",
    poster_path: "/hOdTvjRrIVn2FvP7TdWJXkHnOY7.jpg",
    backdrop_path: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    release_date: "2019-05-30",
    overview:
      "Обычное корейское семейство Кимов жизнь не балует. Приходится жить в сыром полуподвале, воровать интернет у соседей и перебиваться случайными подработками. Однажды сыну семейства удается устроиться репетитором в богатый дом, и тогда Кимы решают использовать шанс и проникнуть в жизнь богачей.",
    genre_ids: [35, 18, 53],
  },
]

// Функция для поиска фильмов
export async function searchMovies(query: string) {
  try {
    // Пытаемся использовать API
    const response = await fetch(
      `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&language=ru&query=${encodeURIComponent(
        query,
      )}&page=1&include_adult=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`)
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Ошибка при поиске фильмов:", error)

    // Если API не работает, ищем в локальной базе данных
    const results = movieDatabase.filter((movie) => {
      const searchLower = query.toLowerCase()
      return (
        movie.title.toLowerCase().includes(searchLower) ||
        movie.overview.toLowerCase().includes(searchLower) ||
        (movie.release_date && movie.release_date.includes(searchLower))
      )
    })

    // Если в локальной базе ничего не нашли, возвращаем случайные фильмы
    if (results.length === 0) {
      // Перемешиваем базу данных и возвращаем первые 5 фильмов
      return shuffleArray(movieDatabase).slice(0, 5)
    }

    return results
  }
}

// Функция для получения детальной информации о фильме
export async function getMovieDetails(movieId: number) {
  try {
    const response = await fetch(`${TMDB_API_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ru`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Ошибка при получении информации о фильме:", error)

    // Ищем фильм в локальной базе данных
    const movie = movieDatabase.find((m) => m.id === movieId)
    return movie || null
  }
}

// Функция для преобразования ID жанра в название
export function genreIdToName(genreId: number): string {
  return genreMap[genreId] || "Другое"
}

// Функция для перемешивания массива (алгоритм Фишера-Йейтса)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Функция для получения популярных фильмов
export async function getPopularMovies(page = 1) {
  try {
    const response = await fetch(`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=ru&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`)
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Ошибка при получении популярных фильмов:", error)

    // Если API не работает, возвращаем фильмы из локальной базы данных
    return shuffleArray(movieDatabase).slice(0, 10)
  }
}
