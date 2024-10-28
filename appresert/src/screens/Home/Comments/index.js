import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Comments.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import Favorite from "../../../components/Favorite";
import Avatar from "../../../components/Avatar"
import { Routes } from "../../../Constants";
import { useTranslation } from "react-i18next";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";
import NoContent from "../../../components/NoContent";
import Loader from "../../../components/Loader";
import { formatTime } from "../../../Utils/formatTime";

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
  const users = useSelector((state) => state.users)
  const [loader, setLoader] = useState(false)
  const [lastComments, setLastComment] = useState([])
  
  const getAllcomment= useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard(`gestreserv/commentaries/`, 'GET', '', users.access_token);
    if (res.status === 200) {
      setLastComment(res?.response?.results?.slice(0, 3));
      setLoader(false)
    }
  }, [users.access_token])
   
  // Utilisez un effet pour avoir tous les commentaires
  useEffect(() => {
    getAllcomment()
  }, [getAllcomment]);

  return (
    <Card className={cn(styles.card, className)} title={t("views.home.comments")} classTitle="title-yellow">
      <div className={styles.comments}>
        <div className={styles.list}>
          {loader ? <Loader/> :
            lastComments.length > 0 ?
              lastComments.map((x, index) => (
                <div className={styles.item} key={index}>
                  <Avatar user={{username: x.user?.full_name !== null ? x.user?.full_name : x.user?.email, photo: x.user.photo_user}} classname={styles.avatar}/>
                  <div className={styles.details}>
                    <div className={styles.line}>
                      <div className={styles.user}>
                        <span className={styles.title}>{x.user?.full_name !== null ? (x.user?.full_name.length > 8 ? `${x.user?.full_name.slice(0, 8)}...` : x.user?.full_name) : (x.user?.email.length > 8 ? `${x.user?.email.slice(0, 8)}...` : x.user?.email)}</span>{" "}
                        <span className={styles.login}>@{x.user?.email.length > 7 ? `${x.user?.email.slice(0, 7)}...` : x.user?.email}</span>
                      </div>
                      <div className={styles.time}>{formatTime(x.updated_at, 'GETDATEHOUR')}</div>
                    </div>
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={{ __html: x.package[0]?.package_name }}
                    ></div>
                    <div
                      className={styles.comment}
                      dangerouslySetInnerHTML={{ __html: x.content }}
                    ></div>
                    <div className={styles.control}>
                      <Link className={styles.link} to={`${Routes.MY_PROFILE}/${x.user?.id}`}>
                        <Icon name="profile-circle" size="20" />
                      </Link>
                      <Favorite className={cn(styles.favorite, styles.link)} />
                      <Link className={styles.link} to={Routes.COMMENTS}>
                        <Icon name="link" size="20" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : <NoContent message={''}/>
          }
        </div>
        <Link className={cn("button-stroke", styles.button)} to={Routes.COMMENTS} >
          {t('views.home.view_all')}
        </Link>
      </div>
    </Card>
  );
};

export default Comments;
