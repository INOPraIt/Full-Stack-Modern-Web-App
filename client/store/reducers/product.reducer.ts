import { handleActions } from 'redux-actions';
import { Reducer } from 'redux';
import { getAllProductsAsync } from '../actions/products.action';
import { Product } from '@/types/Product';

export interface ProductState {
  state: Product[];
  language: string;
  error: string | null;
}

const initialState: ProductState = {
  state: [],
  language: 'ru',
  error: null,
};

const productReducer = handleActions(
  {
    [getAllProductsAsync.success.toString()]: (
      state: ProductState,
      action: { payload: { data: Product[] } }
    ): ProductState => ({
      ...state,
      state: Array.isArray(action.payload.data) ? action.payload.data : [],
      error: null,
    }),

    [getAllProductsAsync.failed.toString()]: (
      state: ProductState,
      action: { payload: { message?: string } }
    ): ProductState => ({
      ...state,
      state: [],
      error: action.payload?.message || 'Ошибка получения продуктов',
    }),
  },
  initialState
) as Reducer<ProductState>;

export default productReducer;
