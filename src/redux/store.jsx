import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  authReducer  from './reducers/auth.reducer'
import  reportReducer from './reducers/report.reducer'
import  supportReducer from './reducers/support.reducer'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  loggedInUser: authReducer,
  reports: reportReducer,
  supports: supportReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

