import React from "react";
import cn from "classnames";
import styles from "./Profile.module.sass";
import Avatar from "../../../components/Avatar";
import { useSelector } from "react-redux";
//import Icon from "../../../components/Icon";

/*const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "pinterest",
    url: "https://www.pinterest.com/ui8m/",
  },
];*/

const Profile = () => {
  const users = useSelector((state) => state.users);

  return (
    <div className={styles.profile}>
      <div className={styles.details}>
        <Avatar user={{username: users.users?.email, photo: users.users?.photo_user}} width='80px' height='80px' classname={styles.avatar}>
          <button className={styles.add}>
            {/*<Icon name="add" />*/}
          </button>
        </Avatar>
        <div className={styles.wrap}>
          <div className={cn("h4", styles.man)}>{users.users.full_name ? users.users.full_name : users.users.email}</div>
          {users.users.bio &&
            <div className={styles.info}>
              {users.users.bio}
            </div>
          }
        </div>
      </div>
      <div className={styles.contacts}>
        {/*<div className={styles.socials}>
          {socials.map((x, index) => (
            <a
              className={styles.social}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Icon name={x.title} size="24" />
            </a>
          ))}
        </div>*/}
        <a className={cn("button", styles.button)} href="/settings">Edit profile</a>
      </div>
    </div>
  );
};

export default Profile;
