import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import appReducer from "./app/appSlice";
import themeReducer from "./theme/themeSlice"; // Импортируйте срез темы

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  theme: themeReducer, // Добавьте срез темы в корневой редьюсер
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
