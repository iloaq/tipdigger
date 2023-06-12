import { RootState } from "./../store";
import { AuthForm, IRegistrationForm, IUser } from "./../../models/User";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AUTH, DB } from "../../firebase";

export interface UserState {
  userData: IUser | null;
  loading: boolean;
  errorMessage: string | null;
  authChecking: boolean;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  errorMessage: null,
  authChecking: false,
};

export const createUser = createAsyncThunk(
  "user/create",
  async (formData: IRegistrationForm, thunkAPI) => {
    try {
      const resp = await DB.createUser(formData);

      if (resp === "Ошибка авторизации") {
        thunkAPI.rejectWithValue("Ошибка авторизации");
      } else if (!resp) {
        thunkAPI.rejectWithValue("Ошибка при создании пользователя");
      } else {
        localStorage.setItem("user_email", resp.email);
        return resp;
      }
    } catch (error) {
      thunkAPI.rejectWithValue("Не удалось создать пользователя");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    AUTH.logout();
    window.localStorage.removeItem("user_email");
  } catch (error) {
    thunkAPI.rejectWithValue("Неизвестная ошибка");
  }
});

export const login = createAsyncThunk(
  "user/login",
  async (formData: AuthForm, thunkAPI) => {
    try {
      const { user } = await AUTH.login(formData.email, formData.password);

      if (user.email) {
        window.localStorage.setItem("user_email", user.email);

        const findResp = await DB.getUserByEmail(user.email);

        const loginUser = findResp.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (loginUser.length > 0) {
          return loginUser[0];
        } else {
          thunkAPI.rejectWithValue("Пользователь не найден");
        }
      } else {
        thunkAPI.rejectWithValue("Ошибка авторизации");
      }
    } catch (error) {
      thunkAPI.rejectWithValue("Ошибка авторизации");
    }
  }
);

export const chekAuth = createAsyncThunk("user/checkAuth", async () => {
  try {
    const userEmail = window.localStorage.getItem("user_email");

    if (userEmail) {
      const findResp = await DB.getUserByEmail(userEmail);

      const loginUser = findResp.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (loginUser.length > 0) {
        return loginUser[0];
      }

      return null;
    }
  } catch (error) {
    return null;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ
    [createUser.pending.type]: (state) => {
      state.errorMessage = null;
      state.loading = true;
    },
    [createUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.errorMessage = null;
      state.loading = false;
      state.userData = action.payload;
    },
    [createUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    // АВТОРИЗАЦИЯ
    [login.pending.type]: (state) => {
      state.errorMessage = null;
      state.loading = true;
    },
    [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.errorMessage = null;
      state.loading = false;
      state.userData = action.payload;
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    // ВЫХОД
    [logout.fulfilled.type]: (state) => {
      state.userData = null;
      state.errorMessage = null;
    },
    // ПРОВЕРКА ПРИ ПОВТОРНОМ ВХОДЕ
    [chekAuth.fulfilled.type]: (state, action: PayloadAction<IUser | null>) => {
      state.userData = action.payload;
      state.authChecking = false;
    },
    [chekAuth.pending.type]: (state) => {
      state.authChecking = true;
    },
    [chekAuth.rejected.type]: (state) => {
      state.authChecking = false;
    },
  },
});

export const selectUserData = (state: RootState) => state.user.userData;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.errorMessage;

export const selectAuthChecking = (state: RootState) => state.user.authChecking;

export default userSlice.reducer;
