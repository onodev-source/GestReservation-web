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
      icon: "edit",
      url: `${Routes.PACKAGES_EDIT}/${packageId}`,
    },
    {
      icon: "trash",
      action: () => deletePackagesById(packageId),
    },
    {
      icon: "arrow-right",
      action: () => setVisibleModalProduct(true),
    },
  ];

  return (
    <>   
      <div className={cn(styles.control, className)}>
        {actions.map((x, index) => (
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
