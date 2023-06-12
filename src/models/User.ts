import { HTMLInputTypeAttribute } from "react";
import { OrderResponseBody } from "@paypal/paypal-js/types";

export interface ITransactionsItem {
  type: "withdraw" | "receipt";
  time: string;
  sum: string | number;
  senderName?: string;
  id: string;
}

export interface ISaveTransaction {
  recepientId: string;
  transaction: OrderResponseBody;
}

export interface IUser {
  id: string;
  balance: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  company: string;
  accountType: "administrator" | "tip_recipient";
  rating: number;
  access: boolean;
  transactions: ITransactionsItem[];
}

export interface IRegistrationForm extends Omit<IUser, "id"> {
  password: string;
  confirm_password: string;
  access: boolean;
}

export interface IAuthField {
  legend: string;
  maxLength?: number;
  fieldName: keyof IRegistrationForm;
  type?: HTMLInputTypeAttribute;
  masked?: boolean;
  mask?: string;
  placeholder?: string;
}

export interface AuthForm {
  email: string;
  password: string;
}
