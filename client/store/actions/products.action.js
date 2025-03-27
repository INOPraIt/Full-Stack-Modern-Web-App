import { createActionFactory } from '../../utils/store/helpers';

const factory = createActionFactory('PRODUCTS');

export const getAllProducts = factory.create('GET_ALL_PRODUCTS');
export const getAllProductsAsync = factory.createAsync("GET_ALL_PRODUCTS_ASYNC");
