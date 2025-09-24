import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './reducers/Products';
import cartSlice from './slice/CartSlice';
import { userApi } from './reducers/User';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath] : userApi.reducer,
    cart: cartSlice.reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(userApi.middleware, productsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch