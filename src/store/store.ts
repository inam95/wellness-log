import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './auth/auth.slice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  debug: true,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

persistor.subscribe(() => {
  console.log('Persistor state:', persistor.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
