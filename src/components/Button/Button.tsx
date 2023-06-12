import React, {
  DetailedHTMLProps,
  FC,
  ButtonHTMLAttributes,
  ReactNode,
  useContext
} from "react";
import cn from "classnames";

import styles from "./Button.module.scss";
import { ThemeContext } from "../../ThemeContext";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  appearance?: "primary" | "ghost";
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  appearance = "primary",
  ...props
}) => {

  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <button
      className={cn(styles.btn, className, themeClass, {
        [styles.primary]: appearance === "primary" && !themeClass,
        [styles.ghost]: appearance === "ghost" && !themeClass,
        [`${styles.primary} ${styles.dark}`]: appearance === "primary" && themeClass,
        [`${styles.ghost} ${styles.dark}`]: appearance === "ghost" && themeClass,
      })}
      {...props}
    >
      {children}
    </button>
  );
};
