import React, {
  DetailedHTMLProps,
  FC,
  FunctionComponent,
  HTMLAttributes,
  SVGProps,
  useContext
} from "react";

import styles from "./ProfileInfo.module.scss";
import { ThemeContext } from "../../ThemeContext"

interface ProfileInfoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  title: string;
  value: string;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
  Icon,
  title,
  value,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";
  return (
    <div className={`${styles.info} ${themeClass}`} {...props}>
      <Icon />
      <div className={`${styles.descr} ${themeClass}`}>
        <span className={`${styles.title} ${themeClass}`}>{title}</span>
        <span className={`${styles.value} ${themeClass}`}>{value}</span>
      </div>
    </div>
  );
};
