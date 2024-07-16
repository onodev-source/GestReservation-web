// Redux
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import language from './Reducers/ParamsReducer';
import users from './Reducers/UsersReducer';

const rootReducer = combineReducers({
    users: users,
    language: language,
});

const persistConfig = {
    key: 'root',
    storage: storage,

};

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, reduxDevtools);
export const persistor = persistStore(store);
