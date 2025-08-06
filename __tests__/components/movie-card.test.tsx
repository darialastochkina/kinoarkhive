/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MovieCard } from '@/components/movie-card'
import type { Movie } from '@/lib/tmdb-service'

const mockMovie: Movie = {
  id: 'test-movie-1',
  tmdbId: 123,
  title: 'Test Movie',
  originalTitle: 'Test Movie Original',
  year: 2024,
  genre: ['Драма', 'Комедия'],
  description: 'This is a test movie description',
  posterUrl: 'https://example.com/poster.jpg',
  backdropUrl: 'https://example.com/backdrop.jpg',
  rating: 8.5,
  popularity: 100,
  mediaType: 'movie',
  isInWatchlist: false,
  isWatched: false,
}

const mockHandlers = {
  onToggleWatchlist: jest.fn(),
  onMarkAsWatched: jest.fn(),
  onRemoveFromWatched: jest.fn(),
  onLoadDetails: jest.fn(),
}

describe('MovieCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render movie information correctly', () => {
    render(
      <MovieCard
        movie={mockMovie}
        {...mockHandlers}
      />
    )

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('8.5')).toBeInTheDocument()
    expect(screen.getByText('Драма')).toBeInTheDocument()
    expect(screen.getByText('Комедия')).toBeInTheDocument()
    expect(screen.getByText('This is a test movie description')).toBeInTheDocument()
  })

  it('should display correct poster image', () => {
    render(
      <MovieCard
        movie={mockMovie}
        {...mockHandlers}
      />
    )

    const posterImage = screen.getByRole('img', { name: /test movie/i })
    expect(posterImage).toHaveAttribute('src', 'https://example.com/poster.jpg')
  })

  it('should handle poster image error', () => {
    render(
      <MovieCard
        movie={mockMovie}
        {...mockHandlers}
      />
    )

    const posterImage = screen.getByRole('img', { name: /test movie/i })
    
    // Simulate image error
    fireEvent.error(posterImage)
    
    expect(posterImage).toHaveAttribute('src', expect.stringContaining('placeholder.svg'))
  })

  it('should call onToggleWatchlist when watchlist button is clicked', () => {
    render(
      <MovieCard
        movie={mockMovie}
        {...mockHandlers}
      />
    )

    const watchlistButton = screen.getByTitle(/добавить в 'посмотрю позже'/i)
    fireEvent.click(watchlistButton)

    expect(mockHandlers.onToggleWatchlist).toHaveBeenCalledWith('test-movie-1')
  })

  it('should show different button state when movie is in watchlist', () => {
    const watchlistedMovie = { ...mockMovie, isInWatchlist: true }
    
    render(
      <MovieCard
        movie={watchlistedMovie}
        {...mockHandlers}
      />
    )

    expect(screen.getByTitle(/убрать из списка просмотра/i)).toBeInTheDocument()
  })

  it('should open rating dialog when watched button is clicked', async () => {
    render(
      <MovieCard
        movie={mockMovie}
        {...mockHandlers}
      />
    )

    const watchedButton = screen.getByTitle(/отметить как просмотренный/i)
    fireEvent.click(watchedButton)

    await waitFor(() => {
      expect(screen.getByText('Оцените фильм')).toBeInTheDocument()
    })
  })

  it('should call onRemoveFromWatched when watched movie button is clicked', () => {
    const watchedMovie = { ...mockMovie, isWatched: true, userRating: 8 }
    
    render(
      <MovieCard
        movie={watchedMovie}
        {...mockHandlers}
      />
    )

    const watchedButton = screen.getByTitle(/отменить как просмотренный/i)
    fireEvent.click(watchedButton)

    expect(mockHandlers.onRemoveFromWatched).toHaveBeenCalledWith('test-movie-1')
  })

  it('should display user rating when movie is watched', () => {
    const watchedMovie = { ...mockMovie, isWatched: true, userRating: 8 }
    
    render(
      <MovieCard
        movie={watchedMovie}
        {...mockHandlers}
      />
    )

    expect(screen.getByText('8/10')).toBeInTheDocument()
    expect(screen.getByText('Ваша оценка:')).toBeInTheDocument()
  })

  it('should open movie details modal when card is clicked', async () => {
    render(
      <MovieCard
        movie={mockMovie}
        {...mockHandlers}
      />
    )

    const cardContent = screen.getByText('This is a test movie description').closest('.netflix-card-content')
    if (cardContent) {
      fireEvent.click(cardContent)
    }

    await waitFor(() => {
      expect(screen.getAllByText('Test Movie')[1]).toBeInTheDocument() // Second instance in modal
    })
  })

  it('should handle rating submission in rating dialog', async () => {
    render(
      <MovieCard
        movie={mockMovie}
        {...mockHandlers}
      />
    )

    // Open rating dialog
    const watchedButton = screen.getByTitle(/отметить как просмотренный/i)
    fireEvent.click(watchedButton)

    await waitFor(() => {
      expect(screen.getByText('Оцените фильм')).toBeInTheDocument()
    })

    // Select 10-star rating
    const starButtons = screen.getAllByRole('button').filter(
      button => button.querySelector('svg.h-6.w-6')
    )
    
    if (starButtons.length >= 10) {
      fireEvent.click(starButtons[9]) // 10th star (0-indexed)
      
      // Click save button
      const saveButton = screen.getByText('Сохранить')
      fireEvent.click(saveButton)

      expect(mockHandlers.onMarkAsWatched).toHaveBeenCalledWith(mockMovie, 10)
    }
  })

  it('should show TV badge for TV shows', () => {
    const tvShow = { ...mockMovie, mediaType: 'tv' as const }
    
    render(
      <MovieCard
        movie={tvShow}
        {...mockHandlers}
      />
    )

    expect(screen.getByText('Сериал')).toBeInTheDocument()
  })

  it('should handle missing optional properties gracefully', () => {
    const minimalMovie: Movie = {
      id: 'minimal-movie',
      tmdbId: 456,
      title: 'Minimal Movie',
      year: 2024,
      genre: [],
      description: '',
      posterUrl: '',
      backdropUrl: '',
      mediaType: 'movie',
      isFavorite: false,
    }

    render(
      <MovieCard
        movie={minimalMovie}
        {...mockHandlers}
      />
    )

    expect(screen.getByText('Minimal Movie')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })
})