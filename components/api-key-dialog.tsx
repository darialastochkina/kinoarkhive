"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, Key } from "lucide-react"

interface ApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApiKeySet: (key: string) => void
  currentKey?: string | null
}

export function ApiKeyDialog({ open, onOpenChange, onApiKeySet, currentKey }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState(currentKey || "")

  const handleSave = () => {
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim())
      onOpenChange(false)
    }
  }

  const handleGetKey = () => {
    window.open("http://www.omdbapi.com/apikey.aspx", "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="vintage-dialog max-w-md">
        <DialogHeader>
          <DialogTitle className="vintage-dialog-title flex items-center gap-2">
            <Key className="h-5 w-5" />
            Настройка OMDB API
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-burgundy-dark">
            <p className="mb-2">По умолчанию используется встроенный API ключ для доступа к полной базе OMDB.</p>
            <p className="mb-4">
              Вы можете ввести свой собственный ключ, если хотите использовать персональный лимит запросов.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-burgundy font-medium">
              OMDB API Ключ
            </Label>
            <Input
              id="api-key"
              type="text"
              placeholder="Введите ваш API ключ"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="vintage-input"
            />
          </div>

          <div className="bg-cream-dark p-4 rounded-lg border border-gold">
            <h4 className="font-medium text-burgundy mb-2">Как получить персональный API ключ (опционально):</h4>
            <ol className="text-sm text-burgundy-dark space-y-1 list-decimal list-inside">
              <li>Перейдите на сайт OMDB API</li>
              <li>Заполните форму регистрации</li>
              <li>Подтвердите email</li>
              <li>Скопируйте полученный ключ сюда</li>
            </ol>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleGetKey} className="vintage-button-outline flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Получить ключ
          </Button>
          <Button onClick={handleSave} disabled={!apiKey.trim()} className="vintage-button">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
