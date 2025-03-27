import { takeEvery } from 'redux-saga/effects';
import { bindAsyncActions } from '../../utils/store/helpers';
import {getAllProducts, getAllProductsAsync} from '../actions/products.action';
import ProductsApi from '../../services/api/products/index';

export function* productSaga() {
  yield takeEvery(getAllProducts, bindAsyncActions(getAllProductsAsync)(ProductsApi.getAllProducts));
}
