import React from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../../../components/Icon";
//import Actions from "../../../../components/Actions";
import { NavLink } from "react-router-dom";
import ModalProduct from "../../../../components/ModalProduct";
import { Routes } from "../../../../Constants";


const Control = ({ className, visibleActions, setVisibleActions, up }) => {
  const [visibleModalProduct, setVisibleModalProduct] = React.useState(false);

  const actions = [
    {
      title: "Edit product",
      icon: "edit",
      url: Routes.PRODUITS_EDIT
    },
    {
      title: "Delete product",
      icon: "trash",
      action: () => console.log("Delete product"),
    },
    {
      title: "Details product",
      icon: "arrow-right",
      action: () => setVisibleModalProduct(true),
    }
  ];

  return (
    <div className={cn(styles.control, className)}>
      {actions.map((act, index) =>    
        act.url ? (
          <NavLink className={styles.button}  activeClassName={styles.active} to={act.url}  key={index}  exact>
              <Icon name={act.icon} size="20" />
          </NavLink>
        ) : (
          <button className={styles.button} key={index} onClick={act.action}>
            <Icon name={act.icon} size="20" />
          </button>
        )
      )}
      <ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} product={true}/>
      {/*<Actions
        className={styles.actions}
        classActionsHead={styles.actionsHead}
        classActionsBody={styles.actionsBody}
        classActionsOption={styles.actionsOption}
        items={actions}
        visible={visibleActions}
        setVisible={setVisibleActions}
        up={up}
      />*/}
    </div>
  );
};

export default Control;
