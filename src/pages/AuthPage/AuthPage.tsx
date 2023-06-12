import React, { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./AuthPage.module.scss";
import { Button, TextField } from "../../components";
import { useForm } from "react-hook-form";
import { AuthForm, IAuthField } from "../../models/User";
import { authSchema } from "../../utils/validators/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../../hooks/redux";
import { selectUserLoading } from "../../store/user/userSlice";
import { ThemeContext } from "../../ThemeContext"

interface AuthPageProps {
  login: (formData: AuthForm) => void;
}

const authFields: IAuthField[] = [
  {
    placeholder: "sample@mail.com",
    legend: "Email",
    type: "email",
    fieldName: "email",
  },
  {
    legend: "Password",
    type: "password",
    fieldName: "password",
  },
];

export const AuthPage: FC<AuthPageProps> = ({ login }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: yupResolver(authSchema),
  });

  const navigate = useNavigate();

  const userLoading = useAppSelector(selectUserLoading);

  const goToRegisterPage = () => {
    navigate("/register");
  };

  const onSubmit = (data: AuthForm) => {
    login(data);
  };
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <form className={`${styles.content} ${themeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={`${styles.title} ${themeClass}`}>Log in</h1>
      <div className={`${styles.form} ${themeClass}`}>
        {authFields.map((field) => (
          <TextField
            {...field}
            key={field.legend}
            //@ts-ignore
            {...register(field.fieldName)}
            //@ts-ignore
            error={errors[field.fieldName]}
          />
        ))}
      </div>
      <div className={`${styles.footer} ${themeClass}`}>
        <Button type="submit" disabled={userLoading}>
          {userLoading ? "Loading..." : "Log in"}
        </Button>
        <Button onClick={goToRegisterPage} appearance="ghost" className={`${styles.buttonfooter} ${themeClass}`}>
          Registration
        </Button>
      </div>
    </form>
  );
};
