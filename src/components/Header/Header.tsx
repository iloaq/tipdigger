import React, { DetailedHTMLProps, FC, HTMLAttributes, useContext } from "react";
import cn from "classnames";

import { ReactComponent as Logo } from "./icons/logo.svg";
import { ReactComponent as Searchicon } from "./icons/search-icon.svg";
import { ReactComponent as Burger } from "./icons/burger.svg";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext"; // Импортируем контекст темы

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type?: "gray" | "white";
}

export const Header: FC<HeaderProps> = ({
  type = "gray",
  className,
  ...props
}) => {
  const theme = useContext(ThemeContext); // Получаем значение текущей темы из контекста
  const themeClass = theme === "dark" ? styles.dark : ""; // Определяем класс для темной темы

  return (
    <div className={cn(styles.header, className, themeClass, { [styles.gray]: type === "gray", [styles.white]: type === "white" })} {...props}>
      <div className={cn(styles.title)}>
        <Link to="/app" className={styles.logo_link}>
          <Logo />
          <h1 className={styles.title_text}>
            <span>Tip</span>
            <span>Digger</span>
          </h1>
        </Link>
      </div>
      <div className={styles.searchicon}>
        <Searchicon />
      </div>
      <div className={styles.burger}>
        <Burger />
      </div>
    </div>
  );
};
