/**
 * @jest-environment jsdom
 */
import { MovieService } from '@/lib/movie-service'

describe('MovieService', () => {
  let movieService: MovieService

  beforeEach(() => {
    movieService = new MovieService()
  })

  describe('Initialization', () => {
    it('should initialize movie service', async () => {
      await movieService.initialize()
      
      const movies = await movieService.getPopularMovies(1, 5)
      expect(movies).toBeDefined()
      expect(Array.isArray(movies)).toBe(true)
    })
  })

  describe('Search Functionality', () => {
    beforeEach(async () => {
      await movieService.initialize()
    })

    it('should search movies by title', async () => {
      const results = await movieService.searchMovies('Один день')
      
      expect(Array.isArray(results)).toBe(true)
      if (results.length > 0) {
        expect(results[0]).toHaveProperty('id')
        expect(results[0]).toHaveProperty('title')
        expect(results[0]).toHaveProperty('tmdbId')
        expect(results[0]).toHaveProperty('mediaType')
      }
    })

    it('should return popular movies when search is empty', async () => {
      const results = await movieService.searchMovies('')
      
      expect(Array.isArray(results)).toBe(true)
      expect(results.length).toBeGreaterThan(0)
    })

    it('should limit search results', async () => {
      const results = await movieService.searchMovies('фильм')
      
      expect(results.length).toBeLessThanOrEqual(50)
    })
  })

  describe('Movie Recommendations', () => {
    beforeEach(async () => {
      await movieService.initialize()
    })

    it('should get popular movies', async () => {
      const movies = await movieService.getRecommendedMovies('popular', 10)
      
      expect(Array.isArray(movies)).toBe(true)
      expect(movies.length).toBeLessThanOrEqual(10)
      
      if (movies.length > 1) {
        // Check if sorted by popularity (descending)
        const popularities = movies
          .map(m => m.popularity || 0)
          .filter(p => p > 0)
        
        for (let i = 1; i < popularities.length; i++) {
          expect(popularities[i]).toBeLessThanOrEqual(popularities[i - 1])
        }
      }
    })

    it('should get top rated movies', async () => {
      const movies = await movieService.getRecommendedMovies('top_rated', 10)
      
      expect(Array.isArray(movies)).toBe(true)
      expect(movies.length).toBeLessThanOrEqual(10)
      
      if (movies.length > 1) {
        // Check if sorted by rating (descending)
        const ratings = movies
          .map(m => m.rating || 0)
          .filter(r => r > 0)
        
        for (let i = 1; i < ratings.length; i++) {
          expect(ratings[i]).toBeLessThanOrEqual(ratings[i - 1])
        }
      }
    })

    it('should get classic movies (before 1990)', async () => {
      const movies = await movieService.getRecommendedMovies('classics', 10)
      
      expect(Array.isArray(movies)).toBe(true)
      
      movies.forEach(movie => {
        if (movie.year) {
          expect(movie.year).toBeLessThan(1990)
        }
      })
    })

    it('should get recent movies', async () => {
      const currentYear = new Date().getFullYear()
      const movies = await movieService.getRecommendedMovies('recent', 10)
      
      expect(Array.isArray(movies)).toBe(true)
      
      movies.forEach(movie => {
        if (movie.year) {
          expect(movie.year).toBeGreaterThanOrEqual(currentYear - 5)
        }
      })
    })
  })

  describe('Genre Filtering', () => {
    beforeEach(async () => {
      await movieService.initialize()
    })

    it('should filter movies by genre', async () => {
      // Test with Drama genre (ID: 18)
      const dramaMovies = await movieService.getMoviesByGenre(18, 1, 10)
      
      expect(Array.isArray(dramaMovies)).toBe(true)
      
      dramaMovies.forEach(movie => {
        expect(movie.genre.some(g => g === '18' || g === 'Драма')).toBe(true)
      })
    })
  })

  describe('Movie Conversion', () => {
    it('should convert MovieData to Movie format', async () => {
      await movieService.initialize()
      
      const movies = await movieService.getPopularMovies(1, 1)
      
      if (movies.length > 0) {
        const movie = movies[0]
        
        expect(movie).toHaveProperty('id')
        expect(movie).toHaveProperty('tmdbId')
        expect(movie).toHaveProperty('title')
        expect(movie).toHaveProperty('year')
        expect(movie).toHaveProperty('genre')
        expect(movie).toHaveProperty('description')
        expect(movie).toHaveProperty('posterUrl')
        expect(movie).toHaveProperty('backdropUrl')
        expect(movie).toHaveProperty('mediaType', 'movie')
        
        expect(Array.isArray(movie.genre)).toBe(true)
        expect(typeof movie.year).toBe('number')
        expect(typeof movie.tmdbId).toBe('number')
      }
    })
  })

  describe('Unique Movie Handling', () => {
    beforeEach(async () => {
      await movieService.initialize()
    })

    it('should track used movies to avoid duplicates', async () => {
      // Reset used movies first
      movieService.resetUsedMovies()
      
      const batch1 = await movieService.getRecommendedMovies('popular', 3)
      const batch2 = await movieService.getRecommendedMovies('popular', 3)
      
      // Check that there are no duplicate IDs between batches
      const batch1Ids = batch1.map(m => m.id)
      const batch2Ids = batch2.map(m => m.id)
      
      const overlappingIds = batch1Ids.filter(id => batch2Ids.includes(id))
      expect(overlappingIds.length).toBe(0)
    })

    it('should reset used movies when calling resetUsedMovies', async () => {
      await movieService.getRecommendedMovies('popular', 5)
      movieService.resetUsedMovies()
      
      const newBatch = await movieService.getRecommendedMovies('popular', 5)
      expect(Array.isArray(newBatch)).toBe(true)
    })
  })
})