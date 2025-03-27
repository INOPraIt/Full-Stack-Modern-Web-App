import { handleActions } from 'redux-actions';

import {
  changeUserFieldActionAsync,
  registerUserAsync,
  loginUserAsync,
  getUserInfoActionAsync, 
  changeUserLanguageFieldAsync, 
  clearUserErrorAsync 
} from '../actions/user.actions';

const initialState = {
  state: null,
  language: 'ru',
  error: null,
  logined: null,
  userId: null,
};

export default handleActions(
  {
    [loginUserAsync.success]: (s, a) =>({
      ...s,
      logined: a.payload.data.message,
      userId: a.payload.data.user._id,
      error: a.payload.data && a.payload.data.message? 
      null :  a.payload.data && a.payload.data.error ?
      a.payload.data.error : "Что-то пошло не так"
    }),

    [registerUserAsync.success]: (s, a) => ({
      ...s,
      registred: a.payload.data.success,
      error: a.payload.data && a.payload.data.success ?
      null : a.payload.data && a.payload.data.error ? 
      a.payload.data.error : "Что-то пошло не так"
    }),

    [getUserInfoActionAsync.success]: (s, { payload: { response, data: requestData } } = {}) => ({
      ...s,
      state: requestData.success ? requestData.result.user : null,
      error:
        response && response.statusText == 'Unauthorized'
          ? null
          : requestData.success
          ? null
          : requestData.error
          ? requestData.error
          : 'error',
    }),
    [changeUserFieldActionAsync.success]: (s, { payload: {name, value} } = {}) => ({ ...s, [name]: value}),
    [changeUserLanguageFieldAsync.success]: (s, { payload: { language } } = {}) => ({ ...s, language: language }),
    [clearUserErrorAsync.success]: (s, a) => ({ ...s, error: null }),

    [getUserInfoActionAsync.failed]: (s, { payload: { response } } = {}) => ({
      ...s,
      state: response && response.status == '401' ? null : s.state,
      error: response && response.status == '401' ? null : 'error',
    }),
    [clearUserErrorAsync.failed]: (s, a) => ({ ...s, error: null }),
  },
  initialState
);
