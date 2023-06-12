import React, { DetailedHTMLProps, FC, HTMLAttributes, useContext } from "react";
import cn from "classnames";

import styles from "./Avatar.module.scss";
import defaultAvatar from "../../assets/images/default_avatar.jpg";
import { ReactComponent as EditIcon } from "./icons/pencil.svg";
import { ThemeContext } from "../../ThemeContext"

interface AvatarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "small" | "large";
  imgUrl?: string;
  isEdit?: boolean;
}

export const Avatar: FC<AvatarProps> = ({
  size = "small",
  className,
  imgUrl,
  isEdit,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";
  return (
    <div className={`${styles.wrapper} ${themeClass}`}>
      <div
        className={cn(styles.avatar_box, className, themeClass, {
          [styles.small]: size === "small",
          [styles.large]: size === "large",
        })}
        {...props}
      >
        <img src={imgUrl ? imgUrl : defaultAvatar} alt="avatar" />
      </div>
      {isEdit && (
        <button className={`${styles.edit_box} ${themeClass}`}>
          <EditIcon />
        </button>
      )}
    </div>
  );
};
