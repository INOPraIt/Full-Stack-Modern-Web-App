// store/reducers/createRootReducer.ts
import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import productReducer from './product.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

export default rootReducer;
export type RootReducerType = ReturnType<typeof rootReducer>;

