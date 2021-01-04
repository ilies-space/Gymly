import {combineReducers, createStore} from 'redux';

import DatabaseReducer from '../Reducers/DatabaseReducer';
import {persistReducer, persistStore} from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';

const AppReducers = combineReducers({
  DatabaseReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  whitelist: ['DatabaseReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer);
export const peristedStore = persistStore(store);

export default store;
