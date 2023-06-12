import React, { FC, FunctionComponent, SVGProps, useContext } from "react";
import { Link } from "react-router-dom";

import { Avatar, Header, ProfileInfo, ProfileLink } from "../../components";
import { ReactComponent as EditIcon } from "./icons/pencil.svg";
import { ReactComponent as ExitIcon } from "./icons/exit.svg";
import { ReactComponent as PhoneIcon } from "./icons/phone.svg";
import { ReactComponent as CompanyIcon } from "./icons/company.svg";
import { ReactComponent as GPSIcon } from "./icons/gps.svg";
import { ReactComponent as EmailIcon } from "./icons/email.svg";
import { ReactComponent as ContactIcon } from "./icons/contact.svg";
import { ReactComponent as OfferIcon } from "./icons/offer.svg";
import { ReactComponent as PersonalIcon } from "./icons/personal.svg";

import styles from "./ProfilePage.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { selectUserData } from "../../store/user/userSlice";
import { IRegistrationForm } from "../../models/User";
import { title } from "process";
import { ThemeContext } from "../../ThemeContext"

interface IProfileItem {
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  title: string;
  fieldName: keyof IRegistrationForm;
}

interface IProfileLink {
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  title: string;
  to: string;
}

const profileInfoItems: IProfileItem[] = [
  {
    Icon: EmailIcon,
    title: "Email",
    fieldName: "email",
  },
  {
    Icon: GPSIcon,
    title: "City",
    fieldName: "city",
  },
  {
    Icon: CompanyIcon,
    title: "Company",
    fieldName: "company",
  },
  {
    Icon: PhoneIcon,
    title: "Phone",
    fieldName: "phone",
  },
];

const profileLinks: IProfileLink[] = [
  {
    Icon: ContactIcon,
    title: "Contacts",
    to: "/profile",
  },
  {
    Icon: OfferIcon,
    title: "Contract offer",
    to: "/profile",
  },
  {
    Icon: PersonalIcon,
    title: "Policy regarding the processing of personal data",
    to: "/profile",
  },
];

interface ProfilePageProps {
  logout: () => void;
}

export const ProfilePage: FC<ProfilePageProps> = ({ logout }) => {
  const userData = useAppSelector(selectUserData);
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.dark : "";
  return (
    <div className={`${styles.profile} ${themeClass}`}>
      <Header />
      {userData && (
        <>
          <div className={`${styles.profile_head} ${themeClass}`}>
            <div className={`${styles.left} ${themeClass}`}>
              <Avatar size="large" />
              <span
                className={`${styles.name} ${themeClass}`}
              >{`${userData.firstName} ${userData.lastName}`}</span>
            </div>
            <div className={`${styles.right} ${themeClass}`}>
              <Link to="edit">
                <EditIcon />
              </Link>
              <button className={`${styles.exit} ${themeClass}`} onClick={logout}>
                <ExitIcon />
              </button>
            </div>
          </div>
          <div className={`${styles.info} ${themeClass}`}>
            {profileInfoItems.map((item) => (
              <ProfileInfo
                key={item.fieldName}
                title={item.title}
                //@ts-ignore
                value={userData[item.fieldName]}
                Icon={item.Icon}
              />
            ))}
          </div>
        </>
      )}
      <div className={`${styles.links} ${themeClass}`}>
        {profileLinks.map((link) => (
          <ProfileLink {...link} key={link.title} />
        ))}
      </div>
    </div>
  );
};
