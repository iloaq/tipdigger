import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import cn from "classnames";

import { ReactComponent as UserIcon } from "./icons/user.svg";
import { ReactComponent as WithDrawIcon } from "./icons/withdraw.svg";
import styles from "./Transaction.module.scss";
import { formatAMPM } from "../../utils/formatter";

interface TransactionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: "withdraw" | "receipt";
  time: string;
  sum: string | number;
  senderName?: string;
}

export const Transaction: FC<TransactionProps> = ({
  type,
  time,
  sum,
  senderName = "Withdraw",
  className,
}) => {
  return (
    <div className={cn(styles.transaction, className)}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          {type === "withdraw" ? <WithDrawIcon /> : <UserIcon />}
        </div>
        <div className={styles.info}>
          <span className={styles.sender_name}>{senderName}</span>
          <span className={styles.time}>{formatAMPM(new Date(time))}</span>
        </div>
      </div>
      <div
        className={cn(styles.right, {
          [styles.green]: type === "receipt",
        })}
      >
        <span>{type === "receipt" ? `+ ${sum}` : `- ${sum}`}</span>
      </div>
    </div>
  );
};
