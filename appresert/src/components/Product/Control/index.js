import React, { useState } from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../Icon";
//import ModalProduct from "../../ModalProduct";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";

const Control = ({ className, item, getAllPackages, product, prodOrPackId, onClickDelete, handleChangeVisibleProduct }) => {
  const users = useSelector((state) => state.users);
  //const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  
  const deletePackagesById = async(id) => {
    let res = await RequestDashboard(`gestreserv/packages/${id}/`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllPackages()
    }
  }
  
  const actions = [
    {
      id: 1,
      icon: "edit",
      url: product ? `${Routes.PACKAGES_EDIT}/${prodOrPackId}` : `${Routes.PRODUITS_EDIT}/${prodOrPackId}`,
    },
    {
      id: 2,
      icon: "trash",
      action: () => product ? deletePackagesById(prodOrPackId) : onClickDelete(prodOrPackId),
    },
    {
      id: 3,
      icon: "arrow-right",
      action: () => handleChangeVisibleProduct(item),
    },
  ];
  const filteredActions = users.users.is_customer ? actions.filter(item => item.id !== 1 && item.id !== 2)  : actions;

  return (
    <>   
      <div className={cn(styles.control, className)}>
        {filteredActions.map((x, index) => (
          x.url ? (
            <Link className={cn(styles.button)} to={x.url} >
              <Icon name={x.icon} size="20" />
            </Link>
          ) : (
            <button className={styles.button} key={index} onClick={x.action}>
              <Icon name={x.icon} size="20" />
            </button>
          )
        ))}
      </div>
      {/*selectedItem !== null && (<ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} detailsData={selectedItem} key={selectedItem?.id}/>)*/}
    </>
  );
};

export default Control;
