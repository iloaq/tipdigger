import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Preloader.module.scss";

interface PreloaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Preloader: FC<PreloaderProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={cn(styles.preloader, className)}></div>
    </div>
  );
};
