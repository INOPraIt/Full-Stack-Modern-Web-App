// import { handleActions } from 'redux-actions';

import { Reducer } from 'redux';
import {
  changeUserFieldActionAsync,
  registerUserAsync,
  loginUserAsync,
  getUserInfoActionAsync, 
  changeUserLanguageFieldAsync, 
  clearUserErrorAsync 
} from '../actions/user.actions';
import { handleActions } from 'redux-actions';


interface UserState {
  state: any | null; // можно заменить `any` на конкретный тип пользователя
  language: string;
  error: string | null;
  logined: string | null;
  userId: string | null;
  registred?: string | null;
}

const initialState: UserState = {
  state: null,
  language: 'ru',
  error: null,
  logined: null,
  userId: null,
};

const userReducer = handleActions(
  {
    [loginUserAsync.success.toString()]: (s: UserState, a: any): UserState => ({
      ...s,
      logined: a.payload.data.message,
      userId: a.payload.data.user._id,
      error:
        a.payload.data?.message
          ? null
          : a.payload.data?.error
          ? a.payload.data.error
          : 'Что-то пошло не так',
    }),

    [registerUserAsync.success.toString()]: (s: UserState, a: any): UserState => ({
      ...s,
      registred: a.payload.data.success,
      error:
        a.payload.data?.success
          ? null
          : a.payload.data?.error
          ? a.payload.data.error
          : 'Что-то пошло не так',
    }),

    [getUserInfoActionAsync.success.toString()]: (s: UserState, a: any): UserState => {
      const { response, data: requestData } = a.payload ?? {};
      return {
        ...s,
        state: requestData?.success ? requestData.result.user : null,
        error:
          response?.statusText === 'Unauthorized'
            ? null
            : requestData?.success
            ? null
            : requestData?.error
            ? requestData.error
            : 'error',
      };
    },

    [changeUserFieldActionAsync.success.toString()]: (s: UserState, a: any): UserState => ({
      ...s,
      [a.payload.name]: a.payload.value,
    }),

    [changeUserLanguageFieldAsync.success.toString()]: (s: UserState, a: any): UserState => ({
      ...s,
      language: a.payload.language,
    }),

    [clearUserErrorAsync.success.toString()]: (s: UserState): UserState => ({
      ...s,
      error: null,
    }),

    [getUserInfoActionAsync.failed.toString()]: (s: UserState, a: any): UserState => ({
      ...s,
      state: a.payload?.response?.status === '401' ? null : s.state,
      error: a.payload?.response?.status === '401' ? null : 'error',
    }),

    [clearUserErrorAsync.failed.toString()]: (s: UserState): UserState => ({
      ...s,
      error: null,
    }),
  },
  initialState
) as Reducer<UserState>

export default userReducer;



   // [getUserInfoActionAsync.success.toString()]: (s, { payload: { response, data: requestData } } = {} as any) => ({
    //   ...s,
    //   state: requestData.success ? requestData.result.user : null,
    //   error:
    //     response && response.statusText === 'Unauthorized'
    //       ? null
    //       : requestData.success
    //       ? null
    //       : requestData.error
    //       ? requestData.error
    //       : 'error',
    // }),

    // [changeUserFieldActionAsync.success.toString()]: (s, { payload: { name, value } } = {} as any) => ({
    //   ...s,
    //   [name]: value,
    // }),

    // [changeUserLanguageFieldAsync.success.toString()]: (s, { payload: { language } } = {} as any) => ({
    //   ...s,
    //   language,
    // }),