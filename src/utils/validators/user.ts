import * as yup from "yup";

export const registrationSchema = yup
  .object({
    firstName: yup.string().required("Обязательное поле"),
    lastName: yup.string().required("Обязательное поле"),
    phone: yup.string().required("Обязательное поле"),
    email: yup.string().required("Обязательное поле"),
    city: yup.string().required("Обязательное поле"),
    company: yup.string().required("Обязательное поле"),
    password: yup
      .string()
      .required("Обязательное поле")
      .min(6, "Минимальная длина 6 символа"),
    confirm_password: yup
      .string()
      .required("Обязательное поле")
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
    accountType: yup.string().required("Обязательное поле"),
    access: yup.bool().required("Обязательное поле").oneOf([true]),
  })
  .required();

export const authSchema = yup
  .object({
    email: yup.string().required("Обязательное поле"),

    password: yup.string().required("Обязательное поле"),
  })
  .required();
