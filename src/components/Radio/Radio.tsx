import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Radio.module.scss";

interface RadioProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string | number;
  // name: string;
  id: string;
  value: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      // name,
      className,
      value,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn(styles.radio_box, className)}>
        <input
          type="radio"
          // name={name}
          value={value}
          id={id}
          {...props}
          ref={ref}
        />
        <label htmlFor={id} className={styles.label}>
          <span className={styles.circle} />
          <span className={styles.label_text}>{label}</span>
        </label>
      </div>
    );
  }
);
