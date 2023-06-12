import React, { useContext } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

import styles from "./QRpage.module.scss";
import { Avatar, Button, Header, ShadowBox } from "../../components";
import { ReactComponent as PencilIcon } from "./icons/pencil.svg";
import { useAppSelector } from "../../hooks/redux";
import { selectUserData } from "../../store/user/userSlice";
import { ThemeContext } from "../../ThemeContext"; // Импортируйте контекст темы

export const QRpage = () => {
  const userData = useAppSelector(selectUserData);
  const theme = useContext(ThemeContext); // Используйте контекст темы

  const themeClass = theme === "dark" ? styles.dark : "";


  return (
    <div className={`${styles.qr} ${themeClass}`}>
      <Header />
      {userData && (
        <>
          <ShadowBox className={`${styles.ShadowBox} ${themeClass}`}>
            <div className={`${styles.info} ${themeClass}`}>
              <div className={`${styles.profile} ${themeClass}`}>
                <Avatar className={`${styles.avatar} ${themeClass}`} />
                <span>{`${userData.firstName} ${userData.lastName}`}</span>
              </div>
              <Link
                to="/profile/edit"
                className={`${styles.icon} ${themeClass}`}
              >
                <PencilIcon />
              </Link>
            </div>
            <div className={`${styles.balance} ${themeClass}`}>
              Balance: <span>{userData.balance}</span>
            </div>
          </ShadowBox>
          <div className={`${styles.qr_box} ${themeClass}`}>
            <h2 className={`${styles.title} ${themeClass}`}>
              Your personal <span>QR code</span>
            </h2>
            <div className={`${styles.qr_code} ${themeClass}`}>
              <QRCode
                value={`https://bektemirovkam.github.io/tippdigger/#/payment/${userData.id}`}
                size={240}
                level="L" // Установите уровень коррекции ошибок в "L" (Low)
                className={styles.qr_svg}
                />
              {<span>700-413-020</span>}
              {/* <span>{userData.id}</span> */}
            </div>
            <Link
              to={`payment/${userData.id}`}
              className={`${styles.payment_link} ${themeClass}`}
            >
              Go to payment page
            </Link>
            <Button className={`${styles.order_btn} ${themeClass}`}>
              Order a print
            </Button>
            <p className={`${styles.printing_text} ${themeClass}`}>
              Printing with delivery in your city: select a package (business
              card, sticker, etc.) for printing and you will receive ready-made
              materials.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
