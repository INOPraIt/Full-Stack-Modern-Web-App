import { all, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import {userSaga} from './user.saga';
import {productSaga} from './product.saga'; 

export default function* () {
  yield take(REHYDRATE);
  yield all([userSaga(), productSaga()]);
}
