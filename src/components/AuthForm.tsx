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
import axios from "axios"
import { Link, useRouter } from "@tanstack/react-router"
import { useLoginMutation, useRegisterMutation } from "../services/authApi"
import { useState } from "react"

const http = axios.create({
  baseURL: "http://localhost:5000/api/",
  params: {},
  withCredentials: true,
})

// Определение схемы Zod для разных режимов
const registerSchema = z.object({
  username: z.string().min(2, "Минимальная длина имени - 2 символа").max(50),
  firstName: z.string().min(2, "Минимальная длина имени - 2 символа").max(50),
  lastName: z.string().min(2, "Минимальная длина имени - 2 символа").max(50),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(6, "Пароль должен содержать минимум 8 символов"),
  passwordRepeat: z
    .string()
    .min(6, "Пароль должен содержать минимум 8 символов"),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
})

const AuthForm = ({ mode }) => {
  const handleFinish = async values => {
    console.log("Success")

    try {
      const data = await http.post("auth/register", values)
      console.log("data", data)
    } catch (error) {
      console.log("error", error)
    }
  }
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

  console.log(methods.formState.errors)
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
            <>
              {" "}
              <TextField
                required
                fullWidth
                label="username"
                name="username"
                autoComplete="username"
                {...methods.register("username")}
              />
              <TextField
                required
                fullWidth
                label="firstName"
                name="fistName"
                autoComplete="firstName"
                {...methods.register("firstName")}
              />
              <TextField
                required
                fullWidth
                label="lastName"
                name="lastName"
                autoComplete="lastName"
                {...methods.register("lastName")}
              />
              <TextField
                required
                fullWidth
                label="phone"
                name="phone"
                autoComplete="phone"
                {...methods.register("phone")}
              />
            </>
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
          {mode === "register" && (
            <TextField
              required
              fullWidth
              label="Повтор пароля"
              name="passwordRepeat"
              type="passwordRepeat"
              autoComplete="current-password"
              {...methods.register("passwordRepeat")}
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" type="submit">
          <Link to="/"> Отмена</Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={methods.handleSubmit(handleFinish)}
        >
          {mode === "register" ? "Зарегистрироваться" : "Войти"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthForm
