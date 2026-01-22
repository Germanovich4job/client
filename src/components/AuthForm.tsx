import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material"
import { Link, useRouter } from "@tanstack/react-router"
import { useLoginMutation, useRegisterMutation } from "../services/authApi"
import { useState } from "react"

// Определение схемы Zod для разных режимов
const registerSchema = z.object({
  name: z.string().min(2, "Минимальная длина имени - 2 символа").max(50),
  email: z.string().email(),
  password: z.string().min(6, "Пароль должен содержать минимум 8 символов"),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
})

const AuthForm = ({ mode }) => {
  const { navigate } = useRouter()

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  // Выбор нужной схемы валидации в зависимости от режима
  let schema = mode === "register" ? registerSchema : loginSchema

  // Создание контроллера формы с использованием React-Hook-Form и Zod
  const methods = useForm({
    resolver: zodResolver(schema),
  })

  // Мутации для входа и регистрации
  const [login, { isLoading: isLoggingIn }] = useLoginMutation()
  const [register, { isLoading: isRegistering }] = useRegisterMutation()

  // Функция отправки формы
  const submitHandler = async data => {
    try {
      if (mode === "register") {
        await register(data).unwrap()
        alert("Вы успешно зарегистрированы")
        navigate({ to: "/" })
      } else {
        const result = await login(data).unwrap()
        localStorage.setItem("token", result.accessToken)
        alert("Вы вошли в систему")
        navigate({ to: "/" })
      }
    } catch (err) {
      setShowErrorMessage(true)
      console.error(err)
    }
  }

  return (
    <Dialog open={true}>
      <DialogTitle>{mode === "register" ? "Регистрация" : "Вход"}</DialogTitle>
      <DialogContent>
        <form {...methods.handleSubmit(submitHandler)}>
          {mode === "register" && (
            <TextField
              required
              fullWidth
              label="Ваше имя"
              name="name"
              autoComplete="name"
              {...methods.register("name")}
            />
          )}
          <TextField
            required
            fullWidth
            label="Электронная почта"
            name="email"
            autoComplete="email"
            {...methods.register("email")}
          />
          <TextField
            required
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            autoComplete="current-password"
            {...methods.register("password")}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" type="submit">
          <Link to="/"> Отмена</Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={methods.handleSubmit(submitHandler)}
        >
          {mode === "register" ? "Зарегистрироваться" : "Войти"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthForm
