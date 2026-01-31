import {
  Typography,
  Button,
  LinearProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";

import { useDeleteProductMutation, useGetProductByIdQuery } from "../services";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import ProductForm from "./ProductForm";

const ProductCard = ({ id }: { id: string }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const { data: product } = useGetProductByIdQuery(id);

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    await deleteProduct(id)
      .then(res => {
        navigate({ to: "/products" });
      })
      .catch(res => false);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (editDialog) {
    return (
      <ProductForm
        mode="edit"
        onClose={() => setEditDialog(false)}
        open={true}
        product={product}
      />
    );
  }

  return (
    <div className="flex flex-row-reverse gap-4 min-w-220 max-w-280 justify-between border-blue-100 border p-4 rounded-sm">
      {product?.imageUrl && (
        <img
          src={product.imageUrl}
          alt={`Фото ${product.title}`}
          height={400}
          width={400}
          className="object-cover h-100 rounded-lg"
        />
      )}
      <div className="min-w-100 max-w-200 flex flex-col gap-4">
        <Typography gutterBottom variant="h5" component="div">
          {product?.title}
        </Typography>
        <Typography variant="subtitle1" color="primary.main">
          Цена: {product?.price.toLocaleString()} руб.
        </Typography>
        <Typography color="text.secondary">
          Категория: {product?.category}
        </Typography>
        <Typography color="text.secondary">
          Производитель: {product?.manufacturer}
        </Typography>
        <Typography color="text.secondary">
          Описание: {product?.description}
        </Typography>
        <div className="flex flex-row mt-auto gap-2">
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => setEditDialog(true)}
          >
            Редактировать
          </Button>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => setDeleteDialog(true)}
          >
            Удалить
          </Button>
        </div>
      </div>
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          Данная позиция будет удалена из номенклатуры товаров. Действие нельзя
          будет отменить
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="warning"
            onClick={() => setDeleteDialog(false)}
          >
            Выйти из диалога
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleDeleteProduct}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductCard;
