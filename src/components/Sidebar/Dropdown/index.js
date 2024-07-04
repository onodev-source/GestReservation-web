import React, { useState } from "react";
import cn from "classnames";
import styles from "./Dropdown.module.sass";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "../../Icon";

const Dropdown = ({ className, item, visibleSidebar, setValue, onClose, activeIndex, activeIndexNav, onClick }) => {
  const [visible, setVisible] = useState(false);
  const [activeIndexDropdown, setActiveIndexDropdown] = useState(0);

  const { pathname } = useLocation();

  const handleClick = () => {
    setVisible(!visible);
    setValue(true);
  };

  //fonction permettant de mettre a jour le state de l'index actif su dropdown
  const handleClickDropdown = (x, index) => {
    onClose()
    onClick()
    setActiveIndexDropdown(x.id);
  };

  const Head = () => {
    return (
      <button  className={cn( styles.head, {  [styles.active]: pathname.includes(item.slug),}, { [styles.wide]: visibleSidebar } )}
        onClick={() => handleClick()}
      >
        <Icon name={item.icon} size="24" />
        {item.title}
        <Icon name="arrow-down" size="24" />
      </button>
    );
  };

 
  return (
    <div  className={cn(  styles.dropdown, className,  { [styles.active]: visible },
        {[styles.active]: pathname.includes(item.slug), },
        { [styles.wide]: visibleSidebar }
      )}
    >
      {item.add ? (
        <div  className={cn(styles.top, {   [styles.active]: pathname.startsWith("/products/add"), })} >
          <Head />
          <Link  className={cn(styles.add, { [styles.active]: pathname.startsWith("/products/add"), })}
            to="/products/add"  onClick={onClose}
          >
            <Icon name="plus" size="10" />
          </Link>
        </div>
      ) : (
        <Head />
      )}
      <div className={styles.body}>
        {item.dropdown.map((x, index) => (
          <NavLink className={cn(styles.link, {[styles.active] : (activeIndexDropdown === x.id && activeIndex===activeIndexNav)})} activeClassName={styles.active} to={x.url} key={index} onClick={() => handleClickDropdown(x, index)} exact>
            {x.title}
            {x.counter && (
              <div className={styles.counter}>
                {x.counter}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
