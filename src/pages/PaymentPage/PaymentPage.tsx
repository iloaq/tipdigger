import React, { FC, useEffect, useState, useContext } from "react";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import { OrderResponseBody } from "@paypal/paypal-js/types";

import { Header, PaymentForm, Preloader } from "../../components";
import { ReactComponent as SuccessIcon } from "./icons/success.svg";
import {
  getRecepient,
  saveTransaction,
  selectRecipientData,
  selectRecipientError,
  selectRecipientLoading,
} from "../../store/app/appSlice";

import styles from "./PaymentPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ThemeContext } from "../../ThemeContext";

interface PaymentPageProps {
  isInside?: boolean;
}

export const PaymentPage: FC<PaymentPageProps> = ({ isInside }) => {
  const [paid, setPaid] = useState(false);

  const recipient = useAppSelector(selectRecipientData);
  const recipientLoading = useAppSelector(selectRecipientLoading);
  const recipientError = useAppSelector(selectRecipientError);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getRecepient(id));
    }
  }, [dispatch, id]);

  const theme = useContext(ThemeContext);

  const themeClass = theme === "dark" ? styles.dark : "";

  const handleApprove = (order?: OrderResponseBody) => {
    console.log("recipient.id ---> ", recipient?.id);
    if (recipient && order) {
      dispatch(
        saveTransaction({ recepientId: recipient.id, transaction: order })
      );
      setPaid(true);
    }
  };

  const handleError = (err: Record<string, unknown>) => {
    console.log("error ---> ", err);
  };

  if (recipientLoading) {
    return <Preloader />;
  }

  return (
    <div
      className={cn(styles.payment, themeClass, {
        [styles.inside]: isInside,
      })}
    >
      <Header type="white" />
      {recipientError && <span className={styles.error}>{recipientError}</span>}
      {recipient && (
        <div
          className={cn(styles.body, {
            [styles.flex_body]: !paid,
          })}
        >
          {paid ? (
            <div className={styles.success}>
              <SuccessIcon width={"10rem"} height="10rem" />
              <span>Your payment was processed successfully</span>
            </div>
          ) : (
            <PaymentForm
              recipient={recipient}
              handleApprove={handleApprove}
              handleError={handleError}
            />
          )}
        </div>
      )}
      <div
        className={cn(styles.footer, {
          [styles.flex_footer]: paid,
        })}
      >
        <Link to="/app/payment" className={`${styles.link} ${themeClass}`}><p className={`${styles.link} ${themeClass}`}>Contacts</p></Link>
        <Link to="/app/payment" className={`${styles.link} ${themeClass}`}><p className={`${styles.link} ${themeClass}`}>Contract offer</p></Link>
        <Link to="/app/payment" className={`${styles.link} ${themeClass}`}>
        <p className={`${styles.link} ${themeClass}`}>Policy regarding the processing of personal data</p>
        </Link>
      </div>
    </div>
  );
};
