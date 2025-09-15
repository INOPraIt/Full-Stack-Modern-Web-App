import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product } from '@/types/Product'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8080/api/v1/',
  }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `product`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: 'Product' as const, id: p._id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `product/${id}`,
      providesTags: (result, _err, id) => [{ type: 'Product', id }],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi