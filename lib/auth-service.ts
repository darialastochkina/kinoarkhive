// Простая система аутентификации с localStorage
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface UserData {
  user: User
  favorites: string[]
  watchlist?: string[] // Список "Посмотрю позже"
  watched?: WatchedMovie[] // Список "Просмотрено"
}

export interface WatchedMovie {
  movieId: string
  watchedAt: string
  rating?: number // 1-10 звезд
  comment?: string
}

class AuthService {
  private currentUser: User | null = null
  private storageKey = "movieapp_user"
  private favoritesKey = "movieapp_favorites_global"

  constructor() {
    this.loadUser()
    this.initializeTestUsers()
  }

  // Инициализация тестовых пользователей
  private initializeTestUsers() {
    if (typeof window === "undefined") return
    const testUsers = [
      {
        id: "test-user-daria",
        email: "daria.lastochkina@gmail.com",
        name: "Дарья",
        createdAt: new Date().toISOString(),
      },
      {
        id: "test-user-demo",
        email: "test@example.com",
        name: "Тестовый пользователь",
        createdAt: new Date().toISOString(),
      },
    ]

    // Принудительно пересоздаем тестовых пользователей
    let existingUsers = this.getAllUsers()

    // Удаляем старых тестовых пользователей
    existingUsers = existingUsers.filter((user) => !testUsers.some((testUser) => testUser.email === user.email))

    // Добавляем новых тестовых пользователей
    testUsers.forEach((testUser) => {
      existingUsers.push(testUser)
      // Устанавливаем пароль для тестовых пользователей
      if (typeof window !== "undefined") {
        localStorage.setItem(`password_${testUser.id}`, "123456")
      }
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("movieapp_all_users", JSON.stringify(existingUsers))
    }
    console.log("Тестовые пользователи инициализированы:", testUsers)
  }

  // Загрузка пользователя из localStorage
  private loadUser() {
    if (typeof window === "undefined") return
    try {
      const userData = localStorage.getItem(this.storageKey)
      if (userData) {
        this.currentUser = JSON.parse(userData)
      }
    } catch (error) {
      console.error("Ошибка загрузки пользователя:", error)
    }
  }

  // Сохранение пользователя в localStorage
  private saveUser(user: User) {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(user))
      this.currentUser = user
    } catch (error) {
      console.error("Ошибка сохранения пользователя:", error)
    }
  }

  // Регистрация нового пользователя
  async register(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Проверяем, не существует ли уже пользователь с таким email
      const existingUsers = this.getAllUsers()
      if (existingUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: "Пользователь с таким email уже существует" }
      }

      // Создаем нового пользователя
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        createdAt: new Date().toISOString(),
      }

      // Сохраняем пользователя
      this.saveUserToStorage(newUser, password)
      this.saveUser(newUser)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Ошибка при регистрации" }
    }
  }

  // Вход в систему
  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const users = this.getAllUsers()
      console.log("Все пользователи:", users)
      console.log("Попытка входа:", email, password)

      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

      if (!user) {
        return {
          success: false,
          error: `Пользователь с email ${email} не найден. Доступные тестовые аккаунты: daria.lastochkina@gmail.com / test@example.com`,
        }
      }

      // Проверяем пароль
      const storedPassword = localStorage.getItem(`password_${user.id}`)
      console.log("Сохраненный пароль для пользователя:", storedPassword)

      if (storedPassword !== password) {
        return {
          success: false,
          error: `Неверный пароль. Для тестового аккаунта используйте пароль: 123456. Сохраненный пароль: ${storedPassword}`,
        }
      }

      this.saveUser(user)
      console.log("Успешный вход:", user)
      
      // Загружаем избранные для вошедшего пользователя
      const userFavorites = this.loadFavorites()
      console.log(`Загружено ${userFavorites.length} избранных для пользователя ${user.name}`)
      
      return { success: true }
    } catch (error) {
      console.error("Ошибка при входе:", error)
      return { success: false, error: "Ошибка при входе" }
    }
  }

  // Выход из системы
  logout() {
    this.currentUser = null
    localStorage.removeItem(this.storageKey)
  }

  // Получение текущего пользователя
  getCurrentUser(): User | null {
    return this.currentUser
  }

  // Проверка авторизации
  isAuthenticated(): boolean {
    return this.currentUser !== null
  }

  // Сохранение пользователя в общий список
  private saveUserToStorage(user: User, password: string) {
    if (typeof window === "undefined") return
    try {
      const users = this.getAllUsers()
      users.push(user)
      localStorage.setItem("movieapp_all_users", JSON.stringify(users))
      localStorage.setItem(`password_${user.id}`, password)
    } catch (error) {
      console.error("Ошибка сохранения пользователя:", error)
    }
  }

  // Получение всех пользователей
  private getAllUsers(): User[] {
    if (typeof window === "undefined") return []
    try {
      const users = localStorage.getItem("movieapp_all_users")
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error("Ошибка загрузки пользователей:", error)
      return []
    }
  }

  // Сохранение избранных фильмов (привязаны к пользователю)
  saveFavorites(favorites: string[]) {
    if (typeof window === "undefined") return
    try {
      if (this.currentUser) {
        // Сохраняем избранные для конкретного пользователя
        const userFavoritesKey = `movieapp_favorites_${this.currentUser.id}`
        localStorage.setItem(userFavoritesKey, JSON.stringify(favorites))
      } else {
        // Для неавторизованных пользователей сохраняем глобально
        localStorage.setItem(this.favoritesKey, JSON.stringify(favorites))
      }
    } catch (error) {
      console.error("Ошибка сохранения избранных:", error)
    }
  }

  // Загрузка избранных фильмов (привязаны к пользователю)
  loadFavorites(): string[] {
    if (typeof window === "undefined") return []
    try {
      if (this.currentUser) {
        // Загружаем избранные для конкретного пользователя
        const userFavoritesKey = `movieapp_favorites_${this.currentUser.id}`
        const userFavorites = localStorage.getItem(userFavoritesKey)
        if (userFavorites) {
          return JSON.parse(userFavorites)
        }
        
        // Если у пользователя еще нет избранных, пробуем мигрировать глобальные
        const globalFavorites = localStorage.getItem(this.favoritesKey)
        if (globalFavorites) {
          const parsed = JSON.parse(globalFavorites)
          this.saveFavorites(parsed) // Сохраняем для пользователя
          return parsed
        }
        return []
      } else {
        // Для неавторизованных пользователей загружаем глобальные
        const favorites = localStorage.getItem(this.favoritesKey)
        return favorites ? JSON.parse(favorites) : []
      }
    } catch (error) {
      console.error("Ошибка загрузки избранных:", error)
      return []
    }
  }

  // Сохранение списка "Посмотрю позже"
  saveWatchlist(watchlist: string[]) {
    if (typeof window === "undefined") return
    try {
      if (this.currentUser) {
        const userWatchlistKey = `movieapp_watchlist_${this.currentUser.id}`
        localStorage.setItem(userWatchlistKey, JSON.stringify(watchlist))
      } else {
        localStorage.setItem("movieapp_watchlist_global", JSON.stringify(watchlist))
      }
    } catch (error) {
      console.error("Ошибка сохранения watchlist:", error)
    }
  }

  // Загрузка списка "Посмотрю позже"
  loadWatchlist(): string[] {
    if (typeof window === "undefined") return []
    try {
      if (this.currentUser) {
        const userWatchlistKey = `movieapp_watchlist_${this.currentUser.id}`
        const userWatchlist = localStorage.getItem(userWatchlistKey)
        return userWatchlist ? JSON.parse(userWatchlist) : []
      } else {
        const watchlist = localStorage.getItem("movieapp_watchlist_global")
        return watchlist ? JSON.parse(watchlist) : []
      }
    } catch (error) {
      console.error("Ошибка загрузки watchlist:", error)
      return []
    }
  }

  // Сохранение списка "Просмотрено"
  saveWatched(watched: WatchedMovie[]) {
    if (typeof window === "undefined") return
    try {
      if (this.currentUser) {
        const userWatchedKey = `movieapp_watched_${this.currentUser.id}`
        localStorage.setItem(userWatchedKey, JSON.stringify(watched))
      } else {
        localStorage.setItem("movieapp_watched_global", JSON.stringify(watched))
      }
    } catch (error) {
      console.error("Ошибка сохранения watched:", error)
    }
  }

  // Загрузка списка "Просмотрено"
  loadWatched(): WatchedMovie[] {
    if (typeof window === "undefined") return []
    try {
      if (this.currentUser) {
        const userWatchedKey = `movieapp_watched_${this.currentUser.id}`
        const userWatched = localStorage.getItem(userWatchedKey)
        return userWatched ? JSON.parse(userWatched) : []
      } else {
        const watched = localStorage.getItem("movieapp_watched_global")
        return watched ? JSON.parse(watched) : []
      }
    } catch (error) {
      console.error("Ошибка загрузки watched:", error)
      return []
    }
  }

  // Принудительный сброс и пересоздание тестовых аккаунтов
  resetTestAccounts() {
    if (typeof window === "undefined") return
    localStorage.removeItem("movieapp_all_users")
    localStorage.removeItem("password_test-user-daria")
    localStorage.removeItem("password_test-user-demo")
    this.initializeTestUsers()
  }
}

let authServiceInstance: AuthService | null = null
export function getAuthService() {
  if (!authServiceInstance && typeof window !== "undefined") {
    authServiceInstance = new AuthService()
  }
  return authServiceInstance
}
