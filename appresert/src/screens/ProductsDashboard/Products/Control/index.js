import React from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../../../components/Icon";
//import Actions from "../../../../components/Actions";
import { NavLink } from "react-router-dom";
import ModalProduct from "../../../../components/ModalProduct";
import { Routes } from "../../../../Constants";
import { useSelector } from "react-redux";


const Control = ({ className, visibleActions, setVisibleActions, up, onClick, productId, selectedItem }) => {
  const [visibleModalProduct, setVisibleModalProduct] = React.useState(false);
  const users = useSelector((state) => state.users)

  const actions = [
    {
      id: 1,
      title: "Edit product",
      icon: "edit",
      url: `${Routes.PRODUITS_EDIT}/${productId}`
    },
    {
      id: 2,
      title: "Delete product",
      icon: "trash",
      action: () => {
        console.log("Delete action triggered");
        onClick(); // Assurez-vous que la fonction onClick fait ce qu'elle doit faire
      },
    },
    {
      id: 3,
      title: "Details product",
      icon: "arrow-right",
      action: () => {
        console.log("Details action triggered");
        setVisibleModalProduct(true); // Affiche le modal
      },
    }
  ];
  const filteredActions = users.users.is_customer ? actions.filter(item => item.id !== 1 && item.id !== 2)  : actions;

  return (
    <div className={cn(styles.control, className)}>
    {filteredActions.map((act, index) =>    
      act.url ? (
        <NavLink
          className={styles.button}
          activeClassName={styles.active}
          to={act.url}
          key={index}
          exact
        >
          <Icon name={act.icon} size="20" />
        </NavLink>
      ) : (
        <button
          className={styles.button}
          key={index}
          onClick={() => {
            console.log(`Button clicked: ${act.title}`);
            act.action();
          }}
        >
          <Icon name={act.icon} size="20" />
        </button>
      )
    )}
    
    {selectedItem !== null && (<ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} product={true} detailsData={selectedItem} key={selectedItem?.id}/>)}
      
      {/*<ModalProduct visible={visibleModalProduct} onClose={() => setVisibleModalProduct(false)} product={true}/>
      <Actions
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
