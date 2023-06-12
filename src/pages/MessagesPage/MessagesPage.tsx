import React from "react";
import { Header } from "../../components";
import Messages from "../../components/Messages/Messages";
import styles from "./MessagesPage.module.scss";

export const MessagesPage = () => {
  return (
    <div className={styles.container}>
      <Header className={styles.header}/>
      <Messages />
    </div>
  );
};

