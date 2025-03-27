import { createAction, createActions } from 'redux-actions';
import { put } from 'redux-saga/effects';

export const bindAsyncActions = (asyncAction) => (actionHandler) =>
  function* (args = {}, { successPayloadMapper = (p) => p, failurePayloadMapper = (e) => e, startedPayloadMapper = (p) => p } = {}) {
    try {
      yield put(asyncAction.started(startedPayloadMapper()));
      const result = yield actionHandler(args.payload || args);
      yield put(asyncAction.success(successPayloadMapper(result)));
      return { result };
    } catch (error) {
      yield put(asyncAction.failed(failurePayloadMapper(error)));
      return { error };
    }
  };

export const createActionFactory = (namespace) => ({
  create: (type, ...args) => createAction(`${namespace}/${type}`, ...args),
  createAsync: (prefix) =>
    createActions(
      {
        success: (payload) => payload,
        started: (payload) => payload,
        failed: (error) => error,
      },
      {
        prefix: `${namespace}/${prefix}`,
        namespace: '.',
      }
    ),
});
