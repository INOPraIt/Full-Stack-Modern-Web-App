import { takeEvery } from 'redux-saga/effects';
import { bindAsyncActions } from '../../utils/store/helpers';
import {
  registerUser,
  registerUserAsync,
  changeUserFieldAction,
  changeUserFieldActionAsync,
  loginUser,
  loginUserAsync
} from '../actions/user.actions';
import UserApi from '../../services/api/user';

function plugeWorker() {
  return true;
}

function changeUserLanguageWorker(language) {
  return { language };
}

function changeUserFieldWorker({ name, value }) {
  return { name, value }
}

export function* userSaga() {
  yield takeEvery(registerUser, bindAsyncActions(registerUserAsync)(UserApi.registerUser));
  yield takeEvery(loginUser, bindAsyncActions(loginUserAsync)(UserApi.loginUser));
  yield takeEvery(changeUserFieldAction, bindAsyncActions(changeUserFieldActionAsync)(changeUserFieldWorker));
}
