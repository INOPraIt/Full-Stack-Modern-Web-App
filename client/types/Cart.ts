export interface CartItem {
  productId: string
  named: string
  price: number
  image?: string
  qty: number
}

export interface CartState {
  items: Record<string, CartItem>
  totalQty: number
  totalPrice: number
}