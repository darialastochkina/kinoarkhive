"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { User, Mail, Lock, UserPlus, LogIn, Info } from "lucide-react"
import { getAuthService } from "@/lib/auth-service"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuthSuccess: () => void
}

export function AuthDialog({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ email: "", password: "", name: "", confirmPassword: "" })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const authService = getAuthService()
    const result = authService ? await authService.login(loginData.email, loginData.password) : { success: false, error: "Auth service not available" }

    if (result.success) {
      onAuthSuccess()
      onOpenChange(false)
      setLoginData({ email: "", password: "" })
    } else {
      setError(result.error || "Ошибка входа")
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (registerData.password !== registerData.confirmPassword) {
      setError("Пароли не совпадают")
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      setIsLoading(false)
      return
    }

    const authService = getAuthService()
    const result = authService ? await authService.register(registerData.email, registerData.password, registerData.name) : { success: false, error: "Auth service not available" }

    if (result.success) {
      onAuthSuccess()
      onOpenChange(false)
      setRegisterData({ email: "", password: "", name: "", confirmPassword: "" })
    } else {
      setError(result.error || "Ошибка регистрации")
    }

    setIsLoading(false)
  }

  const handleTestLogin = () => {
    setLoginData({ email: "daria.lastochkina@gmail.com", password: "123456" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="vintage-dialog max-w-md">
        <DialogHeader>
          <DialogTitle className="vintage-dialog-title text-center">Добро пожаловать в Киноархив</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="vintage-tabs w-full">
            <TabsTrigger value="login" className="vintage-tab flex-1">
              <LogIn className="h-4 w-4 mr-2" />
              Вход
            </TabsTrigger>
            <TabsTrigger value="register" className="vintage-tab flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Регистрация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            {/* Информация о тестовом аккаунте */}
            <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-300">
                  <p className="font-medium mb-1">Тестовый аккаунт:</p>
                  <p>Email: daria.lastochkina@gmail.com</p>
                  <p>Пароль: 123456</p>
                  <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={handleTestLogin}>
                    Заполнить автоматически
                  </Button>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-cream font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-burgundy" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    className="vintage-input pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-cream font-medium">
                  Пароль
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-burgundy" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="vintage-input pl-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded border border-red-500">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="vintage-button w-full">
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-cream font-medium">
                  Имя
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-burgundy" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Ваше имя"
                    className="vintage-input pl-10"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-cream font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-burgundy" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    className="vintage-input pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-cream font-medium">
                  Пароль
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-burgundy" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="vintage-input pl-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm" className="text-cream font-medium">
                  Подтвердите пароль
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-burgundy" />
                  <Input
                    id="register-confirm"
                    type="password"
                    placeholder="••••••••"
                    className="vintage-input pl-10"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded border border-red-500">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="vintage-button w-full">
                {isLoading ? "Регистрация..." : "Зарегистрироваться"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
