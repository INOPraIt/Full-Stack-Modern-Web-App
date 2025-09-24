import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "@/types/Cart";
import type { Product } from "@/types/Product";

const load = (): CartState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("cart");
    return raw ? (JSON.parse(raw) as CartState) : null;
  } catch {
    return null;
  }
};

const recalc = (state: CartState) => {
  const arr = Object.values(state.items);
  state.totalQty = arr.reduce((s, i) => s + i.qty, 0);
  state.totalPrice = arr.reduce((s, i) => s + i.qty * i.price, 0);
};

const initialState: CartState = load() ?? {
  items: {},
  totalQty: 0,
  totalPrice: 0,
};

type AddPayload = { product: Product; qty?: number; priceOverride?: number };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }: PayloadAction<AddPayload>) {
      const { product, qty = 1, priceOverride } = payload;
      const id = String(product._id);
      const price =
        priceOverride ??
        Math.max(0, Number(product.price) - Number(product.sale ?? 0));
      const prev = state.items[id];
      state.items[id] = {
        productId: id,
        named: product.named,
        image: product.image,
        price,
        qty: (prev?.qty ?? 0) + qty,
      };
      recalc(state);
    },
    removeItem(state, { payload: id }: PayloadAction<string>) {
      delete state.items[id];
      recalc(state);
    },
    decrease(state, { payload: id }: PayloadAction<string>) {
      const it = state.items[id];
      if (!it) return;
      it.qty = Math.max(0, it.qty - 1);
      if (it.qty === 0) delete state.items[id];
      recalc(state);
    },
    increase(state, { payload: id }: PayloadAction<string>) {
      const it = state.items[id];
      if (!it) return;
      it.qty += 1;
      recalc(state);
    },
    setQty(state, { payload }: PayloadAction<{ id: string; qty: number }>) {
      const it = state.items[payload.id];
      if (!it) return;
      it.qty = Math.max(1, Math.floor(payload.qty));
      recalc(state);
    },
    clear(state) {
      state.items = {};
      recalc(state);
    },
  },
});

export const { addItem, removeItem, decrease, setQty, clear } =
  cartSlice.actions;
export default cartSlice;
