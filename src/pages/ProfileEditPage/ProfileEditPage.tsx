import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Avatar, Button, MaskedTextField, TextField } from "../../components";
import { useAppSelector } from "../../hooks/redux";
import { IAuthField, IRegistrationForm } from "../../models/User";
import { selectUserData, selectUserLoading } from "../../store/user/userSlice";
import { registrationSchema } from "../../utils/validators/user";
import { ThemeContext } from "../../ThemeContext"
import styles from "./ProfileEditPage.module.scss";

const profileFields: IAuthField[] = [
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
    mask: "+99 999 99 99 99",
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

export const ProfileEditPage = () => {
  const [, setFixMaskInput] = useState(0); // не устанавливаются значения по умолчанию в инпут с маской

  const userData = useAppSelector(selectUserData);
  const userLoading = useAppSelector(selectUserLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<IRegistrationForm>({
    resolver: yupResolver(registrationSchema),
    defaultValues: userData ? userData : undefined,
  });

  useEffect(() => {
    setFixMaskInput(1);
  }, []);

  const onSubmit = async (data: IRegistrationForm) => {
    console.log(data);
  };

  const setFieldValue = (fieldName: string, value: string) => {
    setValue(fieldName as keyof IRegistrationForm, value);
  };


  const values = watch();
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";
  return (
    <form className={`${styles.edit} ${themeClass} ${styles.customBackground}`} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={`${styles.title} ${themeClass}`}>Edit info</h1>
      <div className={`${styles.avatar_box} ${themeClass}`}>
        <Avatar size="large" isEdit />
      </div>
      {profileFields.map((input) => {
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
      <div className={`${styles.footer} ${themeClass}`}>
        <Button type="button" appearance="ghost" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0 || userLoading}
        >
          {userLoading ? "Loading..." : "Safe"}
        </Button>
      </div>
    </form>
  );
};
