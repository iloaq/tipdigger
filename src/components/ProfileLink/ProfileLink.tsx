import React, { FC, FunctionComponent, SVGProps,useContext } from "react";
import { Link, LinkProps } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "./icons/arrow_r.svg";
import styles from "./ProfileLink.module.scss";
import { ThemeContext } from "../../ThemeContext"

interface ProfileLinkProps extends LinkProps {
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  title: string;
  to: string;
}

export const ProfileLink: FC<ProfileLinkProps> = ({
  title,
  Icon,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";
  return (
    <Link {...props} className={`${styles.link} ${themeClass}`}>
      <Icon />
      <span>{title}</span>
      <ArrowIcon />
    </Link>
  );
};
