/**
 * @jest-environment jsdom
 */
import { getAuthService } from '@/lib/auth-service'

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

describe('AuthService', () => {
  let authService: any

  beforeEach(() => {
    // Mock window object for Node.js environment
    Object.defineProperty(global, 'window', {
      value: {
        localStorage: mockLocalStorage
      },
      writable: true
    })
    
    authService = getAuthService()
    jest.clearAllMocks()
  })

  describe('User Management', () => {
    it('should register a new user', () => {
      const result = authService.register('test@example.com', '123456', 'Test User')
      
      expect(result.success).toBe(true)
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('test@example.com')
      expect(result.user?.name).toBe('Test User')
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })

    it('should login with correct credentials', () => {
      // First register a user
      authService.register('test@example.com', '123456', 'Test User')
      
      const result = authService.login('test@example.com', '123456')
      
      expect(result.success).toBe(true)
      expect(result.user?.email).toBe('test@example.com')
    })

    it('should fail login with incorrect credentials', () => {
      authService.register('test@example.com', '123456', 'Test User')
      
      const result = authService.login('test@example.com', 'wrong-password')
      
      expect(result.success).toBe(false)
      expect(result.message).toBe('Неверный email или пароль')
    })

    it('should logout user', () => {
      authService.register('test@example.com', '123456', 'Test User')
      authService.login('test@example.com', '123456')
      
      authService.logout()
      
      expect(authService.getCurrentUser()).toBeNull()
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('movieapp_current_user')
    })
  })

  describe('Watchlist Management', () => {
    beforeEach(() => {
      const result = authService.register('test@example.com', '123456', 'Test User')
      if (result.user) {
        authService.setCurrentUser(result.user)
      }
    })

    it('should save and load watchlist', () => {
      const watchlist = ['movie1', 'movie2', 'movie3']
      
      authService.saveWatchlist(watchlist)
      const loaded = authService.loadWatchlist()
      
      expect(loaded).toEqual(watchlist)
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'movieapp_watchlist_test-user',
        JSON.stringify(watchlist)
      )
    })

    it('should return empty array when no watchlist exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const watchlist = authService.loadWatchlist()
      
      expect(watchlist).toEqual([])
    })
  })

  describe('Watched Movies Management', () => {
    beforeEach(() => {
      const result = authService.register('test@example.com', '123456', 'Test User')
      if (result.user) {
        authService.setCurrentUser(result.user)
      }
    })

    it('should save and load watched movies', () => {
      const watchedMovies = [
        {
          movieId: 'movie1',
          rating: 5,
          watchedAt: '2024-01-01'
        }
      ]
      
      authService.saveWatched(watchedMovies)
      const loaded = authService.loadWatched()
      
      expect(loaded).toEqual(watchedMovies)
    })

    it('should return empty array when no watched movies exist', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const watched = authService.loadWatched()
      
      expect(watched).toEqual([])
    })
  })
})