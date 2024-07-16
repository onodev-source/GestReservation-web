import React from "react";
import styles from "./NewPost.module.sass";
import cn from "classnames";
import Icon from "../../../../components/Icon";

const items = [
  {
    avatar: "/images/content/avatar.jpg",
    icon: "facebook-fill",
  },
  /*{
    avatar: "/images/content/avatar.jpg",
    icon: "twitter-fill",
  },*/
];

const files = ["image-stroke", "video-stroke"];

const NewPost = ({updatePost}) => {
  return (
    <div className={styles.post}>
      <div className={cn("title-purple", styles.title)}>{updatePost? 'Update post' : 'New post'}</div>
      <div className={styles.list}>
        {items.map((x, index) => (
          <div className={styles.group} key={index}>
            <div className={styles.avatar}>
              <img src={x.avatar} alt="Avatar" />
              <div className={styles.social}>
                {/*<Icon name={x.icon} size="12" />*/}
              </div>
            </div>
            <div className={styles.profile}>
              <span>Username</span>
              <span>@username</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.field}>
        <textarea
          className={styles.textarea}
          name="post"
          placeholder="What you would like to share?"
        />
      </div>
      <div className={styles.info}>
        Fleet coded version has been released{" "}
        <span role="img" aria-label="fire">
          🔥
        </span>
      </div>
      <div className={styles.preview}>
        <img src="/images/content/bg-video.jpg" alt="Video" />
      </div>
      <div className={styles.foot}>
        <div className={styles.files}>
          {files.map((x, index) => (
            <div className={styles.file} key={index}>
              <input type="file" />
              <div className={styles.icon}>
                <Icon name={x} size="20" />
              </div>
            </div>
          ))}
        </div>
        <button className={cn("button", styles.button)}>
          <span>{updatePost? 'Edit' : 'Post'}</span>
          <Icon name="arrow-right" size="24" />
        </button>
      </div>
    </div>
  );
};

export default NewPost;
