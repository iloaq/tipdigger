import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  SyntheticEvent,
  useContext
} from "react";
import MaskInput from "react-input-mask";

import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as MinusIcon } from "./icons/minus.svg";

import styles from "./Counter.module.scss";
import { Button } from "../Button/Button";
import { CustomRadio } from "../CustomRadio/CustomRadio";
import { ThemeContext } from "../../ThemeContext";

const values = [10, 15, 20, 25, 30];

interface CounterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setValue: (value: number) => void;
  value: number;
}

export const Counter: FC<CounterProps> = ({ setValue, value, ...props }) => {
  const onChange = (e: SyntheticEvent<Element, Event>) => {
    //@ts-ignore
    if (!isNaN(parseFloat(e.target.value))) {
      //@ts-ignore
      setValue(parseFloat(e.target.value));
    }
  };

  const increase = () => {
    setValue(value + 5);
  };

  const decrease = () => {
    if (value - 5 <= 0) {
      setValue(0);
    } else {
      setValue(value - 5);
    }
  };

  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <div className={`${styles.counter} ${themeClass}`} {...props}>
      <div className={styles.counter_top}>
        <Button className={styles.btn} onClick={increase}>
          <PlusIcon />
        </Button>
        <MaskInput
          //@ts-ignore
          className={styles.input}
          mask={[/^\d+\s/, " €"]}
          onChange={onChange}
          value={`${value} €`}
          alwaysShowMask
        />
        <Button className={styles.btn} onClick={decrease}>
          <MinusIcon />
        </Button>
      </div>
      <div className={styles.counter_bottom}>
        {values.map((val) => {
          return (
            <CustomRadio
              label={val+' €'}
              id={val.toString()}
              key={val}
              name="values"
              className={`${styles.radio_item} ${themeClass}`}
              labelClass={styles.label}
              value={val}
              onChange={onChange}
              defaultChecked={val === value}
            />
          );
        })}
      </div>
    </div>
  );
};
