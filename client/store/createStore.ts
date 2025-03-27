// store/createStore.ts
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/createRootReducer';
import sagas from './sagas';

// --- persist config
const persistConfig = {
  key: 'wallet',
  storage,
  blacklist: ['chat'],
};

// --- logger colors
const loggerActionColors: Record<string, string> = {
  success: 'green',
  failed: 'red',
  started: 'blue',
};

const sagaMiddleware = createSagaMiddleware();

const devMiddlewares =
  process.env.NODE_ENV === 'development'
    ? [
        createLogger({
          collapsed: true,
          duration: true,
          colors: {
            title: (action: any) =>
              loggerActionColors[action.type.split('.')[1]] || 'gray',
          },
        }),
      ]
    : [];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(sagaMiddleware, ...devMiddlewares))
);

export const persistor = persistStore(store);

sagaMiddleware.run(sagas);

// --- тип стора
export type RootState = ReturnType<typeof rootReducer>;