import React, { useEffect, useRef } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Icon from "../../../../components/Icon";
import Cell from "./Cell";
import Modal from "../../../../components/Modal";
import NewPost from "../NewPost";
import { useSelector } from "react-redux";
import { formatDate } from "../../../../Utils/formatDate";
import RequestDashboard from "../../../../Services/Api/ApiServices";


const Row = ({ item, setRefresh, refresh, onDeletePub }) => {
  const users = useSelector((state) => state.users)
  const postEditRef = useRef(null)

  const [visibleModal, setVisibleModal] = React.useState(false);
  const [updatePost, setUpdatePost] = React.useState(false)
  const [publicity, setPublicity] = React.useState()
  const handleChange = () => {
    setUpdatePost(true)
    setVisibleModal(true)
  }

  const actions=[
    {
      title: 'edit',
      action: () => handleChange()
    },
    {
      title: 'trash',
      action: onDeletePub
    }
  ]

  useEffect(() => {
    if (updatePost) {
      const getPublicityById = async(id) => {
        //setLoading(true)
        let res = await RequestDashboard(`gestreserv/publicities/${id}/`, 'GET', '', users.access_token);
        if (res.status === 200) {
          setPublicity(res.response);
          //setLoading(false)
        }
      }
      getPublicityById(item.id);
    }
  }, [updatePost, users.access_token, item.id]);


  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.item}>
            <div className={styles.preview}>
              <img srcSet={`${item.photo_publicity} 2x`} src={item.photo_publicity} alt="Product" />
              <div className={styles.icon}>
                <Icon
                  name={(item.photo_publicity.includes('jpg') && "image") || (item.photo_publicity.includes('mp4') && "video")}
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
                {item.socials?.map((x, index) => (
                  <a className={styles.social}  href={x.url} target="_blank" rel="noopener noreferrer" key={index} >
                    <Icon name={x.title} size="20" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Start date</div>
          {/*item.distribution > 0 ? (
            <div className={cn("status-green-dark", styles.distribution)}>
              +{item.distribution}x
            </div>
          ) : (
            <div className={cn("status-red-dark", styles.distribution)}>
              {item.distribution}x
            </div>
          )*/}
          <div className={styles.number}>{formatDate(item?.start_date, 'GET')}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>End date</div>
          <div className={styles.number}>{formatDate(item?.end_date, 'GET')}</div>
          {/*<Cell item={item.linkClicks} redIndicator />*/}
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
      <Modal  outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)} modalRef={postEditRef}>
        <NewPost updatePost={updatePost} item={updatePost && publicity} postId={updatePost && publicity?.id} postRef={postEditRef} onRefresh={() => setRefresh(!refresh)}/>
      </Modal>
    </>
  );
};

export default Row;
