export interface ProductDTO {
  title: string;
  category: string;
  manufacturer: string;
  imageUrl: string;
  price: number;
  quantity: number;
  id: string;
}

export interface CreateProductDTO extends Omit<ProductDTO, "id"> {}
export interface UpdateProductDTO extends ProductDTO {}
