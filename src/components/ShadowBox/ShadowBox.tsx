import React, { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./ShadowBox.module.scss";

interface ShadowBoxProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export const ShadowBox: FC<ShadowBoxProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(styles.box, className)} {...props}>
      {children}
    </div>
  );
};
