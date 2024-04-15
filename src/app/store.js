import { combineReducers } from "redux";
import userSlice from "../pages/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import appointmentSlice from "../pages/appointmentSlice";

//* define  the  sections or slices that  my store  will contain ** important to create the corresponding files *//

const reducers = combineReducers({
  user: userSlice,
  appointment: appointmentSlice,
});

//
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

//the storage
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});
