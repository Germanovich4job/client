import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "http://localhost:3000" // твой бекенд хост + порт

// Настройка базовой конфигурации запросов
const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Auth"],
  endpoints: builder => ({
    // Регистрация пользователя
    register: builder.mutation({
      query(body) {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        }
      },
    }),

    // Авторизация пользователя
    login: builder.mutation({
      query(credentials) {
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }
      },
    }),

    // Получение информации о текущем аутентифицированном пользователе
    me: builder.query({
      query() {
        return {
          url: "/auth/me",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Используем локально сохраненный токен
          },
        }
      },
      providesTags: ["Auth"], // Определяем зависимость запроса
    }),

    // Обновление токенов (если нужно)
    refreshTokens: builder.mutation({
      query(refreshToken) {
        return {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        }
      },
    }),
  }),
})

// Экспортирование хуков и методов
export const {
  useRegisterMutation,
  useLoginMutation,
  useMeQuery,
  useRefreshTokensMutation,
} = authApi

export default authApi
