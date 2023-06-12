import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  OrderResponseBody,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js/types";

import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import styles from "./PaymentButtons.module.scss";

const buttonsStyle = {
  layout: "vertical",
  color: "white",
  shape: "pill",
  height: 48,
  tagline: false,
};

interface PaymentButtonsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  amount: string;
  description: string;
  handleApprove: (order?: OrderResponseBody) => void;
  handleError: (err: Record<string, unknown>) => void;
}

export const PaymentButtons: FC<PaymentButtonsProps> = ({
  amount,
  description,
  handleApprove,
  handleError,
}) => {
  const createOrder = (
    _: Record<string, unknown>,
    actions: CreateOrderActions
  ) => {
    return actions.order.create({
      purchase_units: [
        {
          description,
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = async (_: OnApproveData, actions: OnApproveActions) => {
    const order = await actions?.order?.capture();
    handleApprove(order);
  };

  const onError = (err: Record<string, unknown>) => {
    handleError(err);
  };

  return (
    <PayPalButtons
      forceReRender={[amount, description]}
      //@ts-ignore
      style={buttonsStyle}
      className={styles.paybuttons}
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
};
