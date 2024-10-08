import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Comments.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import Favorite from "../../../components/Favorite";
import Avatar from "../../../components/Avatar"
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";

const comments = [
  {
    title: "Ethel",
    login: "@ethel",
    time: "1h",
    content: "On <strong>Smiles – 3D icons</strong>",
    comment: 'Great work <span role="img" aria-label="smile">😊</span>',
    avatar: "/images/content/avatar.jpg",
  },
  {
    title: "Jazmyn",
    login: "@jaz.designer",
    time: "8h",
    content: "On <strong>Fleet - Travel shopping</strong>",
    comment: "I need react version asap!",
    avatar: "/images/content/avatar-1.jpg",
  },
  {
    title: "Ethel",
    login: "@ethel",
    time: "1h",
    content: "On <strong>Smiles – 3D icons</strong>",
    comment: "How can I buy only the design?",
    avatar: "/images/content/avatar-2.jpg",
  },
];

const Comments = ({ className }) => {
  const {t} = useTranslation()
  return (
    <Card className={cn(styles.card, className)} title={t("views.home.comments")} classTitle="title-yellow">
      <div className={styles.comments}>
        <div className={styles.list}>
          {comments.map((x, index) => (
            <div className={styles.item} key={index}>
              <Avatar user={{username: x.title, photo: x.avatar}} classname={styles.avatar}/>
              <div className={styles.details}>
                <div className={styles.line}>
                  <div className={styles.user}>
                    <span className={styles.title}>{x.title}</span>{" "}
                    <span className={styles.login}>{x.login}</span>
                  </div>
                  <div className={styles.time}>{x.time}</div>
                </div>
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: x.content }}
                ></div>
                <div
                  className={styles.comment}
                  dangerouslySetInnerHTML={{ __html: x.comment }}
                ></div>
                <div className={styles.control}>
                  <Link className={styles.link} to={Routes.MY_PROFILE}>
                    <Icon name="profile-circle" size="20" />
                  </Link>
                  <Favorite className={cn(styles.favorite, styles.link)} />
                  <Link className={styles.link} to={Routes.COMMENTS}>
                    <Icon name="link" size="20" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link className={cn("button-stroke", styles.button)} to={Routes.COMMENTS} >
          {t('views.home.view_all')}
        </Link>
      </div>
    </Card>
  );
};

export default Comments;
