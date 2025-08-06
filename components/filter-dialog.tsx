"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { X } from "lucide-react"

// Карта жанров TMDB на русском
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

// Специальные фильтры
const specialFilters = [
  { id: "new", name: "🆕 Новинки", description: "2023-2025" },
  { id: "popular", name: "🔥 Популярные", description: "По популярности" },
  { id: "top_rated", name: "⭐ Высокий рейтинг", description: "8.0+ баллов" },
]

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedGenres: number[]
  selectedSpecials: string[]
  onApplyFilters: (genreIds: number[], specialFilters: string[]) => void
}

export function FilterDialog({
  open,
  onOpenChange,
  selectedGenres,
  selectedSpecials,
  onApplyFilters,
}: FilterDialogProps) {
  const [tempGenres, setTempGenres] = useState<number[]>(selectedGenres)
  const [tempSpecials, setTempSpecials] = useState<string[]>(selectedSpecials)

  // Сортируем жанры по алфавиту
  const sortedGenres = Object.entries(genreMap)
    .map(([id, name]) => ({ id: Number.parseInt(id), name }))
    .sort((a, b) => a.name.localeCompare(b.name))

  // Сбрасываем временные фильтры при открытии диалога
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempGenres([...selectedGenres])
      setTempSpecials([...selectedSpecials])
    }
    onOpenChange(open)
  }

  // Применяем фильтры
  const handleApply = () => {
    // console.log("Применяем фильтры в диалоге:", { tempGenres, tempSpecials })
    onApplyFilters([...tempGenres], [...tempSpecials])
    onOpenChange(false)
  }

  // Сбрасываем все фильтры
  const handleReset = () => {
    setTempGenres([])
    setTempSpecials([])
    onApplyFilters([], [])
    onOpenChange(false)
  }

  // МУЛЬТИСЕЛЕКТ для жанров
  const handleGenreToggle = (genreId: number) => {
    setTempGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId)
      } else {
        return [...prev, genreId]
      }
    })
  }

  // МУЛЬТИСЕЛЕКТ для специальных фильтров
  const handleSpecialToggle = (specialId: string) => {
    setTempSpecials((prev) => {
      if (prev.includes(specialId)) {
        return prev.filter((id) => id !== specialId)
      } else {
        return [...prev, specialId]
      }
    })
  }

  // Удаление отдельного фильтра
  const removeGenre = (genreId: number) => {
    setTempGenres((prev) => prev.filter((id) => id !== genreId))
  }

  const removeSpecial = (specialId: string) => {
    setTempSpecials((prev) => prev.filter((id) => id !== specialId))
  }

  const totalSelected = tempGenres.length + tempSpecials.length

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="netflix-dialog max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4">
          <DialogTitle className="netflix-dialog-title text-2xl">
            Фильтры {totalSelected > 0 && `(${totalSelected})`}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto netflix-scrollbar space-y-6">
          {/* Выбранные фильтры */}
          {totalSelected > 0 && (
            <div className="netflix-selected-filters">
              <h3 className="text-white font-medium mb-3">Выбранные фильтры:</h3>
              <div className="flex flex-wrap gap-2">
                {tempGenres.map((genreId) => (
                  <Badge key={genreId} className="netflix-filter-badge-selected" onClick={() => removeGenre(genreId)}>
                    {genreMap[genreId]}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
                {tempSpecials.map((specialId) => {
                  const filter = specialFilters.find((f) => f.id === specialId)
                  return (
                    <Badge
                      key={specialId}
                      className="netflix-filter-badge-selected"
                      onClick={() => removeSpecial(specialId)}
                    >
                      {filter?.name}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          {/* Специальные фильтры */}
          <div>
            <h3 className="text-white font-medium mb-3 text-lg">Специальные подборки</h3>
            <div className="grid grid-cols-1 gap-3">
              {specialFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="outline"
                  className={`netflix-filter-button ${
                    tempSpecials.includes(filter.id) ? "netflix-filter-button-active" : ""
                  }`}
                  onClick={() => handleSpecialToggle(filter.id)}
                >
                  <div className="text-left">
                    <div className="font-medium">{filter.name}</div>
                    <div className="text-sm opacity-70">{filter.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Жанры */}
          <div>
            <h3 className="text-white font-medium mb-3 text-lg">Жанры</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sortedGenres.map((genre) => (
                <Button
                  key={genre.id}
                  variant="outline"
                  className={`netflix-filter-button-small ${
                    tempGenres.includes(genre.id) ? "netflix-filter-button-active" : ""
                  }`}
                  onClick={() => handleGenreToggle(genre.id)}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 flex flex-row gap-3 pt-4 border-t border-gray-800">
          <Button variant="outline" className="netflix-button-outline flex-1" onClick={handleReset}>
            Сбросить все
          </Button>
          <Button className="netflix-button flex-1" onClick={handleApply}>
            Применить {totalSelected > 0 && `(${totalSelected})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
