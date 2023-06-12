import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useContext
} from "react";
import cn from "classnames";

import styles from "./CustomRadio.module.scss";
import { ThemeContext } from "../../ThemeContext";

interface CustomRadioProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string | number;
  name: string;
  id: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelClass?: string;
  checked?: boolean;
}

export const CustomRadio: FC<CustomRadioProps> = ({
  label,
  name,
  id,
  className,
  labelClass,
  value,
  onChange,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";
  return (
    <div className={cn(styles.filter_box, className,themeClass)}>
      <input
        type="radio"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        {...props}
      />
      <label htmlFor={id} className={cn(styles.label, labelClass, themeClass)}>
        <span>{label}</span>
      </label>
    </div>
  );
};
