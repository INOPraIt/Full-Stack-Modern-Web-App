// store/reducers/createRootReducer.ts
import { combineReducers } from 'redux';

import productReducer from './product.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

export default rootReducer;
export type RootReducerType = ReturnType<typeof rootReducer>;

