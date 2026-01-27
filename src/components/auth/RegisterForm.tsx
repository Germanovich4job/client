import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { jwtDecode } from "jwt-decode"

import { RegisterFormData, registerSchema } from "./schema"
import { TextField, Button, Dialog, Typography } from "@mui/material"
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { Link, useRouter } from "@tanstack/react-router"
import { useRegisterMutation } from "../../services/authApi"

const http = axios.create({
  baseURL: "http://localhost:5000/api/",
  params: {},
  withCredentials: true,
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("accessToken")
    config.headers.Authorization = token
    return config
  },
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  error => {
    if (error.response?.status === 401) {
      console.log("error", error)
      const cookies = document.cookie
      console.log("cookies", cookies)
    }
    return Promise.reject(error)
  },
)

export const RegisterForm = () => {
  const {
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
    },
  })

  const { navigate } = useRouter()

  const [register] = useRegisterMutation()

  const {
    username,
    firstName,
    lastName,
    password,
    repeatPassword,
    email,
    phone,
  } = watch()

  const handleFinish = async values => {
    try {
      const data = await http.post(`auth/register`, values)

      const token = data.data.accessToken
      if (!token) {
        throw new Error("Токены не найдены")
      }
      localStorage.setItem("accessToken", `Bearer ${token}`)

      const decodedToken = jwtDecode(token)
    } finally {
      navigate({ to: "/auth/login" })
    }
  }

  console.log(watch())
  return (
    <Dialog open={true}>
      <div className="flex flex-col p-5 gap-4">
        <Typography variant="h6">Регистрация</Typography>
        <div className="flex flex-col gap-4 w-100">
          <TextField
            required
            fullWidth
            label="username"
            name="username"
            type="username"
            value={username}
            onChange={e => setValue("username", e.target.value)}
            error={!!errors.username}
            helperText={errors.username?.message}
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            label="firstName"
            name="fistName"
            type="firstName"
            value={firstName}
            onChange={e => setValue("firstName", e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            label="lastName"
            name="lastName"
            type="lastName"
            value={lastName}
            onChange={e => setValue("lastName", e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            label="phone"
            name="phone"
            type="phone"
            value={phone}
            onChange={e => setValue("phone", e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            label="Электронная почта"
            name="email"
            type="email"
            value={email}
            onChange={e => setValue("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="off"
          />
          <TextField
            required
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            value={password}
            onChange={e => {
              console.log(typeof e.target.value)
              setValue("password", e.target.value ?? "", {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="false"
          />
          <TextField
            required
            fullWidth
            label="Повтор пароля"
            name="repeatPassword"
            type="password"
            value={repeatPassword}
            onChange={e => setValue("repeatPassword", e.target.value)}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-row justify-end gap-5">
          <Button color="primary" type="submit">
            <Link to="/">Отмена</Link>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleFinish)}
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
