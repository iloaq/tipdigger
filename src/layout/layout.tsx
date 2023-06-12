import React, { FC, ReactNode } from "react";
import Footer from "./Footer/Footer";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, showFooter=true }) => {
  if (showFooter) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
};


export default Layout;
