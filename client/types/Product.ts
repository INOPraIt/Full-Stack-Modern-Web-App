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