import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateProductDTO, ProductDTO, UpdateProductDTO } from "../dto";

const BASE_URL = "http://localhost:5000/api/";

const baseQueryConfig = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: headers => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

const customFetchBaseQuery = async (...args) => {
  const result = await baseQueryConfig(...args);

  if (result.error && result.error.status === 401) {
    console.error("Авторизация не пройдена:", result.error);
  }

  return result;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Product"],
  endpoints: builder => ({
    getAllProducts: builder.query<ProductDTO[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<ProductDTO, string>({
      query: id => `/products/${id}`,
      providesTags: result =>
        result ? [{ type: "Product", id: result.id }] : [],
    }),
    createProduct: builder.mutation<ProductDTO, CreateProductDTO>({
      query: body => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      UpdateProductDTO,
      { id: string; data: CreateProductDTO }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: id => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
