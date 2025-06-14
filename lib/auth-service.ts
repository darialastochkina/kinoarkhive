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
}

class AuthService {
  private currentUser: User | null = null
  private storageKey = "movieapp_user"
  private favoritesKey = "movieapp_favorites"

  constructor() {
    this.loadUser()
    this.initializeTestUsers()
  }

  // Инициализация тестовых пользователей
  private initializeTestUsers() {
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
      localStorage.setItem(`password_${testUser.id}`, "123456")
    })

    localStorage.setItem("movieapp_all_users", JSON.stringify(existingUsers))
    console.log("Тестовые пользователи инициализированы:", testUsers)
  }

  // Загрузка пользователя из localStorage
  private loadUser() {
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
    try {
      const users = localStorage.getItem("movieapp_all_users")
      return users ? JSON.parse(users) : []
    } catch (error) {
      console.error("Ошибка загрузки пользователей:", error)
      return []
    }
  }

  // Сохранение избранных фильмов для текущего пользователя
  saveFavorites(favorites: string[]) {
    if (!this.currentUser) return

    try {
      const key = `${this.favoritesKey}_${this.currentUser.id}`
      localStorage.setItem(key, JSON.stringify(favorites))
    } catch (error) {
      console.error("Ошибка сохранения избранных:", error)
    }
  }

  // Загрузка избранных фильмов для текущего пользователя
  loadFavorites(): string[] {
    if (!this.currentUser) return []

    try {
      const key = `${this.favoritesKey}_${this.currentUser.id}`
      const favorites = localStorage.getItem(key)
      return favorites ? JSON.parse(favorites) : []
    } catch (error) {
      console.error("Ошибка загрузки избранных:", error)
      return []
    }
  }

  // Принудительный сброс и пересоздание тестовых аккаунтов
  resetTestAccounts() {
    localStorage.removeItem("movieapp_all_users")
    localStorage.removeItem("password_test-user-daria")
    localStorage.removeItem("password_test-user-demo")
    this.initializeTestUsers()
  }
}

export const authService = new AuthService()
