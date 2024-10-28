import React, { useState } from "react";
import styles from "./Table.module.sass";
import Checkbox from "../../../components/Checkbox";
import Row from "./Row";
import NoContent from "../../../components/NoContent";
import cn from "classnames";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";

const Table = ({ items, message, getAllcomment }) => {
  const users = useSelector((state) => state.users)
  const [chooseAll, setСhooseAll] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const deleteCommentById = async(id) => {
    let res = await RequestDashboard(`gestreserv/commentaries/${id}/`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllcomment();
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <div className={cn(styles.row, {[styles.marginMessage] : message !== ''})}>
          <div className={styles.col}>
            <Checkbox
              className={styles.checkbox}
              value={chooseAll}
              onChange={() => setСhooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}>Comments</div>
          <div className={styles.col}>Packages</div>
        </div>
        {items.length > 0 ?
          items?.map((x, index) => (
            <Row
              item={x}
              key={index}
              index={index}
              value={selectedFilters.includes(x.id)}
              onChange={() => handleChange(x.id)}
              onDeleteComment = {() => deleteCommentById(x.id)}
              getAllcomment={getAllcomment}
            />
          ))
          : <NoContent message={message !== '' ? 'No comments found for this user.' : ''}/>
        }
      </div>
      {/*<div className={styles.foot}>
        <button className={cn("button-stroke button-small", styles.button)}>
          <Loader className={styles.loader} />
          <span>Load more</span>
        </button>
      </div>*/}
    </div>
  );
};

export default Table;
