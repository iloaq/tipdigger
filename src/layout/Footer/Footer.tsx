import React, { FC, SVGProps, useContext } from "react";
import cn from "classnames";

import styles from "./Footer.module.scss";

import { ReactComponent as QRCodeIcon } from "./icons/qr.svg";
import { ReactComponent as WithDrawalIcon } from "./icons/withdrawal.svg";
import { ReactComponent as ProfileIcon } from "./icons/profile.svg";
import { ReactComponent as Messageicon } from "./icons/message.svg";
import { ReactComponent as Newsicon } from "./icons/news.svg";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext"; // Импортируйте контекст темы

interface IFooterLink {
  title: string;
  Icon: FC<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  navigateTo: string;
}

const links: IFooterLink[] = [
  {
    title: "QR Code",
    Icon: QRCodeIcon,
    navigateTo: "/app",
  },
  {
    title: "Withdrawal",
    Icon: WithDrawalIcon,
    navigateTo: "/withdrawal",
  },
  {
    title: "Messages",
    Icon: Messageicon,
    navigateTo: "/messager",
  },
  {
    title: "News",
    Icon: Newsicon,
    navigateTo: "/news",
  },
  {
    title: "Profile",
    Icon: ProfileIcon,
    navigateTo: "/profile",
  },
];

const FooterLink: FC<IFooterLink> = ({ title, Icon, navigateTo }) => {
  const theme = useContext(ThemeContext); // Используйте контекст темы

  let resolved = useResolvedPath(navigateTo);
  let match = useMatch({
    path: resolved.pathname,
    end: false,
  });

  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <Link
      to={navigateTo}
      className={cn(styles.link, themeClass, {
        [styles.active_link]: match,
      })}
    >
      <Icon className={styles.icon} />
      <span className={styles.link_title}>{title}</span>
    </Link>
  );
};

const Footer = () => {
  const theme = useContext(ThemeContext); // Используйте контекст темы

  const themeClass = theme === "dark" ? styles.dark : "";

  return (
    <div className={`${styles.footer} ${themeClass}`}>
      {links.map((link) => (
        <FooterLink {...link} key={link.title} />
      ))}
    </div>
  );
};

export default Footer;
