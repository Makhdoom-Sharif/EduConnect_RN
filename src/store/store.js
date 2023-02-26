// // import {createStore} from 'redux';
// import rootReducer from './reducer/index';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {configureStore} from '@reduxjs/toolkit';
// import {getDefaultMiddleware} from '@reduxjs/toolkit';
// // const store = createStore(rootReducer);
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// let store = configureStore({
//   reducer: {reducer: persistedReducer},
//   middleware: getDefaultMiddleware => getDefaultMiddleware(),
// });
// let persistor = persistStore(store);
// export {store, persistor};
import {createStore} from 'redux';
import rootReducer from './reducer/index';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const store = createStore(rootReducer);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);
export {store, persistor};
