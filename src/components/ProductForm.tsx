"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React, { useState, useRef } from "react"
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress,
  Card,
} from "@mui/material"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import { useDispatch } from "react-redux"

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../services/productsApi"

// Валидная схема Zod для нашего продукта
const schema = z.object({
  title: z.string().min(1, { message: "Название обязательно" }),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  category: z.string().optional(),
  manufacturer: z.string().optional(),
  imageUrl: z.string().url().optional(), // Добавляем поле для хранения base64 изображения
})

type ProductFormProps = {
  open: boolean
  product?: any // Если передается, значит идет редактирование
  onClose: () => void
  mode: "add" | "edit" // Режимы формы: добавить или обновить
}

const ProductForm = ({ open, product, onClose, mode }: ProductFormProps) => {
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null) // Убираем state для выбранного файла

  // Используем useForm вместе с Zod для контроля формы
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: product || {},
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = methods

  const {
    title,
    description,
    price,
    quantity,
    category,
    manufacturer,
    imageUrl,
  } = watch()

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()

  /**
   * Обработчик отправки формы
   */
  const submitHandler = async data => {
    const formData = {
      title,
      description,
      price,
      quantity,
      category,
      manufacturer,
      imageUrl, // Отправляем строку с изображением в формате base64
    }

    if (mode === "add") {
      await createProduct(formData)
        .unwrap()
        .then(() => {
          reset() // Сбрасываем форму после успешного добавления
          onClose()
        })
        .catch(err => console.error("Ошибка при создании продукта:", err))
    } else if (mode === "edit") {
      await updateProduct({ id: product.id, changes: formData })
        .unwrap()
        .then(() => {
          onClose()
        })
        .catch(err => console.error("Ошибка при обновлении продукта:", err))
    }
  }

  /**
   * Функция для чтения загруженного файла и перевода его в base64
   */
  const readImageAsBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = event => resolve(event.target.result.toString())
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }

  /**
   * Обработчик изменения файла
   */
  const handleFileSelect = async event => {
    const file = event.target.files[0] // Получаем выбранный файл
    if (!file) return

    try {
      const result = await readImageAsBase64(file) // Читаем файл в base64
      setValue("imageUrl", result) // Устанавливаем новое значение поля imageUrl
    } catch (err) {
      console.error("Ошибка при чтении изображения:", err)
    }
  }

  return (
    <Card className="w-3/4 min-w-100 m-4">
      <DialogTitle>
        {mode === "add" ? "Добавление продукта" : "Редактирование продукта"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Остальные поля */}
          <TextField
            label="Название"
            helperText={errors.title?.message}
            error={!!errors.title}
            fullWidth
            margin="dense"
            value={title}
            onChange={event => setValue("title", event.target.value)}
          />
          <TextField
            label="Описание"
            helperText={errors.description?.message}
            error={!!errors.description}
            fullWidth
            margin="dense"
            value={description}
            onChange={event => setValue("description", event.target.value)}
          />
          <TextField
            label="Цена"
            helperText={errors.price?.message}
            error={!!errors.price}
            fullWidth
            margin="dense"
            type="number"
            value={price}
            onChange={event => setValue("price", Number(event.target.value))}
          />
          <TextField
            label="Количество"
            helperText={errors.quantity?.message}
            error={!!errors.quantity}
            fullWidth
            margin="dense"
            type="number"
            value={quantity}
            onChange={event => setValue("quantity", Number(event.target.value))}
          />
          <TextField
            label="Категория"
            helperText={errors.category?.message}
            error={!!errors.category}
            fullWidth
            margin="dense"
            value={category}
            onChange={event => setValue("category", event.target.value)}
          />
          <TextField
            label="Производитель"
            helperText={errors.manufacturer?.message}
            error={!!errors.manufacturer}
            fullWidth
            margin="dense"
            value={manufacturer}
            onChange={event => setValue("manufacturer", event.target.value)}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddAPhotoIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              Выберите изображение
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect} // Используем новый обработчик файлов
              ref={fileInputRef}
              hidden
            />
          </Box>
          <DialogActions>
            <Button onClick={onClose}>Отменить</Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? (
                <CircularProgress size={24} />
              ) : mode === "add" ? (
                "Добавить"
              ) : (
                "Обновить"
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Card>
  )
}

export default ProductForm
