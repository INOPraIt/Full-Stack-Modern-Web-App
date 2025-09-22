export interface Product {
  _id: string
  named: string
  description: string
  image: string
  price: number
  sale?: number
  profit?: number
  previewImages?: string[]
  categories: string[]
  status: boolean
  numberOfCopies: number
  __v?: number
}

export type GetProductsArgs = {
  q?: string
  page?: number
  limit?: number
  category?: string
  categoryId?: string
}

export type GetProductsResp = {
  items: Product[]
  total: number
  page: number
  pages: number
}