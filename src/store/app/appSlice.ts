import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./../store";
import {
  ISaveTransaction,
  ITransactionsItem,
  IUser,
} from "./../../models/User";

import { DB } from "../../firebase";

export interface AppState {
  recipientData: IUser | null;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: AppState = {
  recipientData: null,
  loading: false,
  errorMessage: null,
};

export const getRecepient = createAsyncThunk(
  "app/getRecepient",
  async (id: string, thunkAPI) => {
    try {
      const findResp = await DB.getUserById(id);

      if (findResp.exists()) {
        return { ...findResp.data(), id: findResp.id };
      } else {
        thunkAPI.rejectWithValue("Пользователь не найден");
      }
    } catch (error) {
      thunkAPI.rejectWithValue("Ошибка авторизации");
    }
  }
);

export const saveTransaction = createAsyncThunk(
  "app/saveTransaction",
  async (formData: ISaveTransaction, thunkAPI) => {
    try {
      const transtaction: ITransactionsItem = {
        type: "receipt",
        time: formData.transaction.create_time,
        sum: formData.transaction.purchase_units[0].amount.value,
        senderName: formData.transaction.payer.email_address,
        id: formData.transaction.id,
      };

      await DB.addTransaction(formData.recepientId, transtaction);
    } catch (e) {
      thunkAPI.rejectWithValue("Не удалось сохранить транзакцию");
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: {
    // ПОЛУЧЕНИЕ ПОЛУЧАТЕЛЯ ЧАЕВЫХ
    [getRecepient.pending.type]: (state) => {
      state.errorMessage = null;
      state.loading = true;
    },
    [getRecepient.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.errorMessage = null;
      state.loading = false;
      state.recipientData = action.payload;
    },
    [getRecepient.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const selectRecipientData = (state: RootState) =>
  state.app.recipientData;
export const selectRecipientLoading = (state: RootState) => state.app.loading;
export const selectRecipientError = (state: RootState) =>
  state.app.errorMessage;

export default appSlice.reducer;
