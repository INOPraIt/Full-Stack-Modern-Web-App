import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product, GetProductsArgs, GetProductsResp} from '@/types/Product'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8080/api/v1/',
  }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResp, GetProductsArgs | void>({
      query: (args) => {
        const { q, page = 1, limit = 20, category, categoryId } = args ?? {}
        const params: Record<string, any> = { page, limit }
        if (q) params.q = q
        if (category) params.category = category
        if (categoryId) params.categoryId = categoryId
        return { url: 'product', params }
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((p) => ({ type: 'Product' as const, id: p._id })),
              { type: 'Products' as const, id: 'LIST' },
            ]
          : [{ type: 'Products' as const, id: 'LIST' }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `product/${id}`,
      providesTags: (result, _err, id) => [{ type: 'Product', id }],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi