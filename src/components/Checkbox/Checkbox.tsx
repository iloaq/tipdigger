import React, { DetailedHTMLProps, FC, HTMLAttributes, useContext } from "react";
import cn from "classnames";

import styles from "./Checkbox.module.scss";
import { ReactComponent as CheckIcon } from "./icons/check.svg";
import { ThemeContext } from "../../ThemeContext";

interface CheckboxProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  text?: string;
  type?: "primary" | "ghost";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  id,
  text,
  type = "primary",
  className,
  ...props
}, ref) => {
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <div className={cn(styles.checkbox_box, className, themeClass)}>
      <input type="checkbox" id={id} ref={ref} {...props} />

      <label
        htmlFor={id}
        className={cn(styles.label, {
          [styles.primary]: type === "primary",
          [styles.ghost]: type === "ghost",
        })}
      >
        <span className={styles.square}>
          <CheckIcon className={styles.icon} />
        </span>
        {text && <span className={styles.text}>{text}</span>}
      </label>
    </div>
  );
});

