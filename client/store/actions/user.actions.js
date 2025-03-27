import { createActionFactory } from '../../utils/store/helpers';

const factory = createActionFactory('USERS');

export const registerUser = factory.create('REGISTER_USER');
export const registerUserAsync = factory.createAsync("REGISTER_USER_ASYNC");

export const loginUser = factory.create('LOGIN_USER');
export const loginUserAsync = factory.createAsync('LOGIN_USER_ASYNC');

export const changeUserFieldAction = factory.create('CHANGE_USER_FIELD_ACTION');
export const changeUserFieldActionAsync = factory.createAsync('CHANGE_USER_FIELD_ACTION_ASYNC');

export const getUserInfoAction = factory.create('GET_USER_INFO');
export const getUserInfoActionAsync = factory.createAsync('GET_USER_INFO_ASYNC');

export const changeUserLanguageField = factory.create('CHANGE_USER_LANGUAGE_FIELD');
export const changeUserLanguageFieldAsync = factory.createAsync('CHANGE_USER_LANGUAGE_FIELD_ASYNC');

export const clearUserError = factory.create('CLEAR_USER_ERROR');
export const clearUserErrorAsync = factory.createAsync('CLEAR_USER_ERROR_ASYNC');
