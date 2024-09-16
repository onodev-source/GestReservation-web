import React, { useState } from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../Icon";
import ModalProduct from "../../ModalProduct";
import { Link } from "react-router-dom";
import { Routes } from "../../../Constants";
import RequestDashboard from "../../../Services/Api/ApiServices";
import { useSelector } from "react-redux";

const Control = ({ className, selectedItem, getAllPackages, packageId }) => {
  const users = useSelector((state) => state.users);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  
  const deletePackagesById = async(id) => {
    let res = await RequestDashboard(`gestreserv/packages/${id}`, 'DELETE', '', users.access_token);
    if (res.status === 204) {
      getAllPackages()
    }
  }
  
  const actions = [
    {
      id: 1,
      icon: "edit",
      url: `${Routes.PACKAGES_EDIT}/${packageId}`,
    },
    {
      id: 2,
      icon: "trash",
      action: () => deletePackagesById(packageId),
    },
    {
      id: 3,
      icon: "arrow-right",
      action: () => setVisibleModalProduct(true),
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
      {selectedItem !== null && (<ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} detailsData={selectedItem} key={selectedItem?.id}/>)}
    </>
  );
};

export default Control;
