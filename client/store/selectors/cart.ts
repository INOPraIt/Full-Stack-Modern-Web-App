import type { RootState } from '@/store'
export const selectCart = (s: RootState) => s.cart
export const selectCartItems = (s: RootState) => Object.values(s.cart.items)
export const selectCartTotals = (s: RootState) => ({ qty: s.cart.totalQty, sum: s.cart.totalPrice })
