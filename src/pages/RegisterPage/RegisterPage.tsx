import React, { FC, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThemeContext } from "../../ThemeContext"

import styles from "./RegisterPage.module.scss";
import {
  Button,
  Checkbox,
  MaskedTextField,
  Radio,
  TextField,
} from "../../components";
import { IAuthField, IRegistrationForm } from "../../models/User";
import { useForm } from "react-hook-form";
import { registrationSchema } from "../../utils/validators/user";
import { useAppSelector } from "../../hooks/redux";
import { selectUserLoading } from "../../store/user/userSlice";

interface RegisterPageProps {
  signUp: (formData: IRegistrationForm) => void;
}


const registerFields: IAuthField[] = [
  {
    placeholder: "John",
    legend: "First Name",
    maxLength: 100,
    fieldName: "firstName",
  },
  {
    placeholder: "Doe",
    legend: "Last name",
    maxLength: 100,
    fieldName: "lastName",
  },
  {
    placeholder: "+49 777 000 00 00",
    legend: "Phone number",
    type: "number",
    masked: true,
    mask: "+99 999 999 99 99",
    fieldName: "phone",
  },
  {
    placeholder: "sample@mail.com",
    legend: "Email",
    maxLength: 100,
    type: "email",
    fieldName: "email",
  },
  {
    placeholder: "Berlin",
    legend: "City",
    maxLength: 100,
    fieldName: "city",
  },
  {
    placeholder: "“Google”",
    legend: "Company",
    maxLength: 100,
    fieldName: "company",
  },
  {
    legend: "Password",
    maxLength: 100,
    type: "password",
    fieldName: "password",
  },
  {
    legend: "Repeat password",
    maxLength: 100,
    type: "password",
    fieldName: "confirm_password",
  },
];

export const RegisterPage: FC<RegisterPageProps> = ({ signUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IRegistrationForm>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      accountType: "tip_recipient",
      access: false,
      transactions: [],
      balance: 0,
      rating: 0,
    },
  });

  const userLoading = useAppSelector(selectUserLoading);

  const onSubmit = async (data: IRegistrationForm) => {
    signUp(data);
  };

  const setFieldValue = (fieldName: string, value: string) => {
    setValue(fieldName as keyof IRegistrationForm, value);
  };

  const values = watch();
  
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <form className={`${styles.content} ${themeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={`${styles.title} ${themeClass}`}>Registration</h1>
      {registerFields.map((input) => {
        if (input.masked) {
          return (
            <MaskedTextField
              key={input.fieldName}
              showClearIcon={Boolean(values[input.fieldName])}
              setValue={setFieldValue}
              //@ts-ignore
              error={errors[input.fieldName]}
              {...input}
              {...register(input.fieldName)}
            />
          );
        } else {
          return (
            <TextField
              key={input.fieldName}
              //@ts-ignore
              error={errors[input.fieldName]}
              setValue={setFieldValue}
              showClearIcon={Boolean(values[input.fieldName])}
              {...input}
              {...register(input.fieldName)}
            />
          );
        }
      })}
      <div className={`${styles.account_type} ${themeClass}`}>
        <Radio
          label="Tip recipient"
          id="recipient"
          value="recipient"
          className={styles.radio}
          {...register("accountType")}
        />
        <Radio
          label="Administrator"
          id="administrator"
          value="administrator"
          className={styles.radio}
          {...register("accountType")}
        />
      </div>
      <div className={`${styles.personal_data} ${themeClass}`}>
        <Checkbox
          id="personal_data"
          text="I have read the Consent to the processing of personal data and the policy regarding the processing of personal data. The decision of the “V” mark means my written consent to the terms of these documents and my agreement to comply with them."
          {...register("access")}
        />
      </div>
      <Button
        type="submit"
        disabled={Object.keys(errors).length > 0 || userLoading}
      >
        {userLoading ? "Loading..." : "Continue"}
      </Button>
    </form>
  );
};
