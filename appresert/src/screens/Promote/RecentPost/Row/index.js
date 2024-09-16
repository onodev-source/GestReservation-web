import React from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Icon from "../../../../components/Icon";
import Cell from "./Cell";
import Modal from "../../../../components/Modal";
import NewPost from "../NewPost";
import { useSelector } from "react-redux";


const Row = ({ item }) => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const users = useSelector((state) => state.users)

  const actions=[
    {
      title: 'edit',
      action: () => setVisibleModal(true)
    },
    {
      title: 'trash',
      action: () => console.log('delete')
    }
  ]

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.item}>
            <div className={styles.preview}>
              <img srcSet={`${item.image2x} 2x`} src={item.image} alt="Product" />
              <div className={styles.icon}>
                <Icon
                  name={(item.picture && "image") || (item.video && "video")}
                />
              </div>
            </div>
            <div className={styles.details}>
              <div
                className={styles.post}
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></div>
              <div className={styles.socials}>
                {!users.users.is_customer &&
                  actions.map((x, index) => (
                    <button className={styles.social}  href={'/'} target="_blank" rel="noopener noreferrer" key={index} onClick={x.action}>
                      <Icon name={x.title} size="20" />
                    </button>
                  ))
                }
                {item.socials.map((x, index) => (
                  <a className={styles.social}  href={x.url} target="_blank" rel="noopener noreferrer" key={index} >
                    <Icon name={x.title} size="20" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Distribution</div>
          {item.distribution > 0 ? (
            <div className={cn("status-green-dark", styles.distribution)}>
              +{item.distribution}x
            </div>
          ) : (
            <div className={cn("status-red-dark", styles.distribution)}>
              {item.distribution}x
            </div>
          )}
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Link clicks</div>
          <Cell item={item.linkClicks} redIndicator />
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Views</div>
          <Cell item={item.views} greenIndicator />
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Engagement</div>
          <Cell item={item.engagement} blueIndicator />
        </div>
      </div>
      <Modal  outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <NewPost updatePost={true} />
      </Modal>
    </>
  );
};

export default Row;
