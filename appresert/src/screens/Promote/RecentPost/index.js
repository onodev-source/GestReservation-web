import React, { useCallback, useRef, useState } from "react";
import styles from "./RecentPost.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";
import Row from "./Row";
import NewPost from "./NewPost";

// data
import { posts } from "../../../mocks/posts";
import { useSelector } from "react-redux";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useTranslation } from "react-i18next";

const intervals = ["Last 7 days", "This month", "All time"];

const RecentPost = ({ className }) => {
  const {t} = useTranslation()
  const users = useSelector((state) => state.users)
  const postRef = useRef(null)

  const [allPosts, setAllPosts] = useState([]);
  const [sorting, setSorting] = useState(intervals[0]);
  const [loader, setLoader] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  const getAllPublicity = useCallback(async() => {
    setLoader(true)
    let res = await RequestDashboard('gestreserv/publicities/', 'GET', '', users.access_token);
    if (res.status === 200) {
      setAllPosts(res.response?.results);
      setLoader(false)
    }
  }, [users.access_token]);

  const deletePublicityById = async(id) => {
    let res = await RequestDashboard(`gestreserv/publicities/${id}`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllPublicity();
    }
  };
  
  React.useEffect(() => {
    getAllPublicity()
  }, [getAllPublicity, refresh])

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title={t('views.publicity.recent_post')}
        classTitle={cn("title-blue", styles.title)}
        classCardHead={styles.head}
        head={
          <>
            <Dropdown
              className={styles.dropdown}
              classDropdownHead={styles.dropdownHead}
              value={sorting}
              setValue={setSorting}
              options={intervals}
              small
            />
            {!users.users.is_customer &&
              <button className={cn("button-small", styles.button)}  onClick={() => setVisibleModal(true)} >
                {t('views.publicity.new_post')}
              </button>
            }
          </>
        }
      >
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>{t('views.publicity.posts')}</div>
            <div className={styles.col}>{t('views.reservations.table.date_begin')}</div>
            <div className={styles.col}>{t('views.reservations.table.date_end')}</div>
            <div className={styles.col}>{t('views.publicity.views')}</div>
            <div className={styles.col}>{t('views.reservations.agenda.engagement')}</div>
          </div>
          {loader ?
            <Loader/> :
            allPosts.length > 0 ?
              allPosts.map((x, index) => (
                <Row item={x} key={index} postRef={postRef} setRefresh={setRefresh} refresh={refresh} onDeletePub={() => deletePublicityById(x.id)}/>
              ))
            :
            <div><h5>{t('words.no_content')}</h5></div>
          }
        </div>
        {/*<div className={styles.foot}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <Loader className={styles.loader} />
            <span>Load more</span>
          </button>
        </div>*/}
      </Card>
      <Modal outerClassName={styles.outer} visible={visibleModal}  onClose={() => setVisibleModal(false)} modalRef={postRef}>
        <NewPost postRef={postRef} onRefresh={() => setRefresh(!refresh)}/>
      </Modal>
    </>
  );
};

export default RecentPost;
