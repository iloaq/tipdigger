import React, { ChangeEvent, useState, useContext } from "react";
import { CustomRadio, Header, Transaction } from "../../components";
import { useAppSelector } from "../../hooks/redux";
import { ITransactionsItem } from "../../models/User";
import { selectUserData } from "../../store/user/userSlice";
import { ThemeContext } from "../../ThemeContext"

import styles from "./TransactionsPage.module.scss";

interface ICustomRadio {
  label: string;
  id: string;
}

interface ITransactions {
  [key: string]: ITransactionsItem[];
}

const filters: ICustomRadio[] = [
  {
    label: "Today",
    id: "today",
  },
  {
    label: "Yesterday",
    id: "yesterday",
  },
  {
    label: "Week",
    id: "week",
  },
  {
    label: "Month",
    id: "month",
  },
  {
    label: "Period",
    id: "period",
  },
];

const testTransactions: ITransactions = {
  Today: [
    {
      id: "1",
      type: "receipt",
      time: "11:10 PM",
      sum: 15,
      senderName: "KZ*1231",
    },
    {
      id: "2",
      type: "receipt",
      time: "10:10 PM",
      sum: 15,
      senderName: "John Doe",
    },
    {
      id: "3",
      type: "withdraw",
      time: "10:12 PM",
      sum: 20,
    },
    {
      id: "4",
      type: "receipt",
      time: "11:10 PM",
      sum: 15,
      senderName: "John Doe",
    },
  ],
  Yesterday: [
    {
      id: "5",
      type: "receipt",
      time: "14:10 PM",
      sum: 15,
      senderName: "KZ*1234",
    },
    {
      id: "6",
      type: "receipt",
      time: "10:16 PM",
      sum: 10,
      senderName: "John Doe",
    },
    {
      id: "7",
      type: "withdraw",
      time: "10:11 PM",
      sum: 20,
    },
    {
      id: "8",
      type: "receipt",
      time: "09:10 PM",
      sum: 15,
      senderName: "John Doe",
    },
  ],
};

export const TransactionsPage = () => {
  const [filterValue, setFilterValue] = useState("Today");
  const userData = useAppSelector(selectUserData);
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className={`${styles.transactions} ${themeClass}`}>
      <Header />
      <h2 className={`${styles.title} ${themeClass}`}>Transactions</h2>
      <div className={`${styles.filter} ${themeClass}`}>
        {filters.map((filter) => {
          return (
            <CustomRadio
              name="transactions"
              key={filter.id}
              {...filter}
              className={`${styles.filter_item} ${themeClass}`}
              value={filter.label}
              onChange={onFilterChange}
              checked={filter.label === filterValue}
            />
          );
        })}
      </div>
      {userData &&
        userData.transactions.length > 0 &&
        Object.keys(testTransactions).map((period) => {
          return (
            <div key={period} className={`${styles.period_box} ${themeClass}`}>
              <span className={`${styles.period_title} ${themeClass}`}>{period}</span>
              {userData.transactions.map((transaction) => {
                return <Transaction key={transaction.id} {...transaction} />;
              })}
            </div>
          );
        })}
    </div>
  );
};
