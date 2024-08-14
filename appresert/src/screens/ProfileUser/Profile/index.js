import React from "react";
import cn from "classnames";
import styles from "./Profile.module.sass";
import Avatar from "../../../components/Avatar";
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
  return (
    <div className={styles.profile}>
      <div className={styles.details}>
        <Avatar user={{username: 'pouako', photo: "/images/content/avatar.jpg"}} width='80px' height='80px' classname={styles.avatar}>
          <button className={styles.add}>
            {/*<Icon name="add" />*/}
          </button>
        </Avatar>
        <div className={styles.wrap}>
          <div className={cn("h4", styles.man)}>Chelsie Haley</div>
          <div className={styles.info}>
            Dream big. Think different. Do great!
          </div>
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
