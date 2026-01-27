// import * as z from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { jwtDecode } from "jwt-decode"

// import {
//   RegisterFormData,
//   LoginFormData,
//   registerSchema,
//   loginSchema,
// } from "./schema"
// import {
//   TextField,
//   Button,
//   DialogContent,
//   DialogActions,
//   Dialog,
//   DialogTitle,
//   Card,
// } from "@mui/material"
// import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
// import { Link, useRouter } from "@tanstack/react-router"
// import { useLoginMutation, useRegisterMutation } from "../../services/authApi"

// const http = axios.create({
//   baseURL: "http://localhost:5000/api/",
//   params: {},
//   withCredentials: true,
// })

// http.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     const token = localStorage.getItem("accessToken")
//     config.headers.Authorization = token

//     return config
//   },
// )

// http.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response
//   },
//   error => {
//     if (error.response?.status === 401) {
//       console.log("error", error)
//       const cookies = document.cookie
//       console.log("cookies", cookies)
//     }
//     return Promise.reject(error)
//   },
// )

// const AuthForm = ({ mode }: { mode: "register" | "login" }) => {
//   const {
//     watch,
//     formState: { errors },
//     setValue,
//     handleSubmit,
//   } = useForm<
//     typeof mode extends "register" ? RegisterFormData : LoginFormData
//   >({
//     resolver: zodResolver(mode === "register" ? registerSchema : loginSchema),
//   })

//   const { navigate } = useRouter()

//   const [login] = useLoginMutation()
//   const [register] = useRegisterMutation()

//   const {
//     username,
//     firstName,
//     lastName,
//     password,
//     repeatPassword,
//     email,
//     phone,
//   } = watch()

//   const handleFinish = async values => {
//     try {
//       const data = await http.post(
//         `auth/${mode === "register" ? "register" : "login"}`,
//         values,
//       )
//       console.log("data", data)

//       const token = data.data.accessToken
//       if (!token) {
//         throw new Error("Токены не найдены")
//       }
//       localStorage.setItem("accessToken", `Bearer ${token}`)
//       console.log(token)

//       const decodedToken = jwtDecode(token)
//       console.log(decodedToken)
//     } catch (error) {
//       console.log("error", error)
//     }
//   }

//   return (
//     <Dialog open={true}>
//       <DialogTitle>{mode === "register" ? "Регистрация" : "Вход"}</DialogTitle>
//       <DialogContent>
//         <Card>
//           {mode === "register" && (
//             <>
//               {" "}
//               <TextField required fullWidth label="username" />
//               <TextField required fullWidth label="firstName" name="fistName" />
//               <TextField required fullWidth label="lastName" name="lastName" />
//               <TextField required fullWidth label="phone" name="phone" />
//             </>
//           )}
//           <TextField
//             required
//             fullWidth
//             label="Электронная почта"
//             name="email"
//           />
//           <TextField
//             required
//             fullWidth
//             label="Пароль"
//             name="password"
//             type="password"
//             value={password}
//             onChange={e => setValue("password", e.target.value)}
//           />
//           {mode === "register" && (
//             <TextField
//               required
//               fullWidth
//               label="Повтор пароля"
//               name="repeatPassword"
//               value={repeatPassword}
//               onChange={e => setValue("repeatPassword", e.target.value)}
//               error={errors.repeatPassword}
//               // helperText={errors.repeatPassword.me}
//             />
//           )}
//         </Card>
//       </DialogContent>
//       <DialogActions>
//         <Button color="primary" type="submit">
//           <Link to="/">Отмена</Link>
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit(handleFinish)}
//         >
//           {mode === "register" ? "Зарегистрироваться" : "Войти"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default AuthForm
