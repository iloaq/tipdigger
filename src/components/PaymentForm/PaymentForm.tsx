import React, { FC, useState, useContext } from "react";
import { OrderResponseBody } from "@paypal/paypal-js/types";
import { Avatar } from "../Avatar/Avatar";
import { Counter } from "../Counter/Counter";
import { StarRating } from "../StarRating/StarRating";
import { ReactComponent as ApplePayIcon } from "./icons/apple_pay.svg";
import { ReactComponent as CreditCardIcon } from "./icons/credit_card.svg";
import { ReactComponent as GooglePayIcon } from "./icons/google_pay.svg";
import { Button } from "../Button/Button";
import styles from "./PaymentForm.module.scss";
import bank from "../../assets/images/deutsche_bank.png";
import bankl from "../../assets/images/deutsche_bank_light.png";
import { IUser } from "../../models/User";
import { ThemeContext } from "../../ThemeContext";
import{
MaskedTextField,
TextField,
}
from "../../components"

interface PaymentFormProps {
  recipient: IUser;
  handleApprove: (order?: OrderResponseBody) => void;
  handleError: (err: Record<string, unknown>) => void;
}

export const PaymentForm: FC<PaymentFormProps> = ({
  recipient,
  handleApprove,
  handleError,
}) => {
  const [amount, setAmount] = useState(15);
  const [message, setMessage] = useState("");

  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <>
      <div className={`${styles.body_top} ${themeClass}`}>
        <Avatar size="large" />
        <span>{`${recipient.firstName} ${recipient.lastName}`}</span>
      </div>
      <div className={`${styles.container} ${themeClass}`}>
        <h2 className={`${styles.title} ${themeClass}`}>Leave a tip</h2>
        <Counter value={amount} setValue={setAmount} />
        <h3 className={`${styles.subtitle} ${themeClass}`}>Rate Service</h3>
        <StarRating className={`${styles.rating} ${themeClass}`} />
      </div>
      <div className={`${styles.messageContainer} ${themeClass}`}>
          <TextField
            legend="Message"
            placeholder="Type here"
            className={`${styles.input} ${themeClass}`}
          />
      </div>
      <div className={`${styles.methods} ${themeClass}`}>
        <Button appearance="ghost" className={`${styles.method_btn} ${themeClass}`}>
          <ApplePayIcon />
        </Button>
        <Button appearance="ghost" className={`${styles.method_btn} ${themeClass}`}>
          <GooglePayIcon />
        </Button>
        <Button appearance="ghost" className={`${styles.method_btn} ${themeClass}`}>
          <CreditCardIcon />
        </Button>
      </div>
      
      <div className={`${styles.container} ${themeClass}`}>
        <div className={`${styles.body_bottom} ${themeClass}`}>
          <span>Payments go through</span>
          {theme === "dark" ? (
            <img src={bankl} alt="Deutsche Bank" />
          ) : (
            <img src={bank} alt="Deutsche Bank" />
          )}
        </div>
      </div>
    </>
  );
};
