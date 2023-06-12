import React, { useState, useContext } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./WithdrawalPage.module.scss";
import {
  Avatar,
  Button,
  Checkbox,
  Header,
  MaskedTextField,
  ShadowBox,
  TextField,
} from "../../components";
import purse from "../../assets/images/purse.png";
import { ReactComponent as ConditionalIcon } from "./icons/conditions.svg";
import { useAppSelector } from "../../hooks/redux";
import { selectUserData } from "../../store/user/userSlice";
import { ThemeContext } from "../../ThemeContext"

export const WithdrawalPage = () => {
  const [isInternal, setIsInternal] = useState(false);

  const userData = useAppSelector(selectUserData);

  const switchHandler = (value: boolean) => {
    setIsInternal(value);
  };

  const theme = useContext(ThemeContext);

  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <div className={`${styles.withdrawal} ${themeClass}`}>
      <Header />
      {userData && (
        <ShadowBox className={`${styles.ShadowBox} ${themeClass}`}>
          <div className={`${styles.top_box} ${themeClass}`}>
            <Avatar size="large" imgUrl={purse} />
            <div className={`${styles.balance} ${themeClass}`}>
              <span className={`${styles.balance_title} ${themeClass}`}>Your balance:</span>
              <span className={`${styles.balance_value} ${themeClass}`}>{userData.balance}</span>
            </div>
          </div>
        </ShadowBox>
      )}
      <div className={`${styles.toggler} ${themeClass}`}>
        <button
          className={cn(styles.toggler_item, themeClass, {
            [styles.active]: !isInternal,
          })}
          onClick={() => switchHandler(false)}
        >
          Bank card
        </button>
        <button
          className={cn(styles.toggler_item, themeClass, {
            [styles.active]: isInternal,
          })}
          onClick={() => switchHandler(true)}
        >
          Internal
        </button>
        <div
          className={cn(styles.slider, themeClass, {
            [styles.slider_right]: isInternal,
            [styles.slider_left]: !isInternal,
          })}
        />
      </div>
      {isInternal ? <Internal themeClass={themeClass} /> : <BankCard themeClass={themeClass} />}
    </div>
  );
};

const BankCard = ({ themeClass }: { themeClass: string }) => {
  return (
    <>
      <div className={`${styles.bank_card} ${themeClass}`}>
        <div>
          <TextField
            legend="Transfer amount, €"
            placeholder="100"
            className={`${styles.input} ${themeClass}`}
          />
          <MaskedTextField
            legend="Bank card number"
            placeholder="_ _ _ _ - _ _ _ _ - _ _ _ _ - _ _ _ _"
            mask="0000 0000 0000 0000"
            className={`${styles.input} ${themeClass}`}
          />
        </div>
        <div className={`${styles.calculate} ${themeClass}`}>
          <div className={`${styles.calculate_item} ${themeClass}`}>
            <span>Amount to be transferred:</span>
            <span>0</span>
          </div>
          <div className={`${styles.calculate_item} ${themeClass}`}>
            <span>Commission:</span>
            <span>0</span>
          </div>
        </div>
        <Link to="/withdrawal" className={`${styles.conditions} ${themeClass}`}>
          <ConditionalIcon />
          <span>Conditions for withdrawing money</span>
        </Link>
        <Checkbox
          type="ghost"
          text="Remember card"
          id="remember_card"
          className={`${styles.checkbox} ${themeClass}`}
        />
      </div>
      <Button className={`${styles.continue_btn} ${themeClass}`}>Continue</Button>
    </>
  );
};

const Internal = ({ themeClass }: { themeClass: string }) => {
  return (
    <>
      <div className={`${styles.internal} ${themeClass}`}>
        <TextField
          legend="Transfer amount, €"
          placeholder="100"
          className={`${styles.input} ${themeClass}`}
        />
        <TextField
          legend="User ID"
          placeholder="123456789"
          className={`${styles.input} ${themeClass}`}
        />
      </div>
      <Button className={`${styles.continue_btn} ${themeClass}`}>Continue</Button>
    </>
  );
};
