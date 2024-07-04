import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
import Help from "./Help";
import Image from "../Image";
import Modal from "../Modal";
import Logout from "../../screens/Logout";

const navigation = [
    {
        id: 1,
        title: "Home",
        icon: "home",
        url: "/",
    },
    {
        id: 2,
        title: "Packages",
        slug: "Packages",
        icon: "diamond",
        add: false,
        dropdown: [
            {
                id: 21,
                title: "Products",
                url: "/products/dashboard",
            },
            {
                id: 22,
                title: "Packages",
                url: "/products/released",
                counter: "4",
                colorCounter: "#F2D45F",
            },
           /* {
                title: "Released",
                url: "/products/released",
            },
            {
                title: "Comments",
                url: "/products/comments",
            },*/
        ],
    },
    {
        id: 3,
        title: "Customers",
        slug: "customers",
        icon: "profile-circle",
        url: "/customers/customer-list",
        /*dropdown: [
            {
                title: "Overview",
                url: "/customers/overview",
            },
            {
                title: "Customer list",
                url: "/customers/customer-list",
            },
        ],*/
    },
    {
        id: 4,
        title: "Reservations",
        slug: "reservations",
        icon: "store",
        dropdown: [
            {
                id: 41,
                title: "Reservations",
                url: "/reservations/reservationList",
            },
            {
                id: 42,
                title: "Agenda",
                url: "/reservations/agenda",
                counter: "8",
                colorCounter: "#F2D45F",
            },
        ],
    },
    {
        id: 5,
        title: "Income",
        icon: "pie-chart",
        url: "/income/incomeList",
    },
];

const navigationFoot = [
    {
        id: 6,
        title: "Notifications",
        icon: "notification",
        url: "/notification",
    },
    {
        id: 7,
        title: "Settings",
        icon: "setting",
        url: "/settings",
    },
    {
        id: 8,
        title: "Logout",
        icon: "lock",
    },
];

const Sidebar = ({ className, onClose }) => {
    const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(1);
  
    const handleClick = (x, index) => {
        if(!x.dropdown){
            onClose()
        }
        if((!x.url) && (!x.dropdown)) {
            setVisibleModal(true)
        }
        setActiveIndex(x.id);
    };

    return (
        <>
            <div className={cn(styles.sidebar, className, {   [styles.active]: visible, })} >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24" />
                </button>
                <Link className={styles.logo} to="/" onClick={onClose}>
                    <Image className={styles.pic} src="/images/logo_onograph.png" srcDark="/images/logo-onograph-blanc.png" alt="Core" />
                </Link>
                <div className={styles.menu}>
                    {navigation.map((x, index) =>
                        x.url ? (
                            <NavLink className={cn(styles.item, {[styles.active] : activeIndex=== x.id})}  activeClassName={styles.active} to={x.url}  key={index}  exact  onClick={() => handleClick(x, index)}>
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <Dropdown   className={styles.dropdown} activeIndexNav={x.id}  visibleSidebar={visible}  setValue={setVisible} key={index} 
                            activeIndex={activeIndex}  item={x} onClose={onClose} onClick={() => handleClick(x, index)}/>
                        )
                    )}
                </div>
                <button className={styles.toggle}  onClick={() => setVisible(!visible)}>
                    <Icon name="arrow-right" size="24" />
                    <Icon name="close" size="24" />
                </button>
                <div className={styles.foot}>
                    {navigationFoot.map((x, index) =>
                        x.url ? (
                            <NavLink className={cn(styles.item, {[styles.active] : activeIndex=== x.id})}  activeClassName={styles.active} to={x.url}  key={index}  exact  onClick={() => handleClick(x, index)}>
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <NavLink className={cn(styles.item, {[styles.active] : activeIndex=== x.id})}  activeClassName={styles.active}  key={index}  exact  onClick={() => handleClick(x, index)}>
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        )
                    )}
                    <Theme className={styles.theme} visibleSidebar={visible} />
                </div>
            </div>
            <Modal outerClassName={styles.outer} visible={visibleModal} onClose={() => setVisibleModal(false)} >
                <Logout />
            </Modal>
            <Help  visible={visibleHelp}  setVisible={setVisibleHelp}  onClose={onClose}/>
            <div  className={cn(styles.overlay, { [styles.active]: visible })} onClick={() => setVisible(false)}></div>
        </>
    );
};

export default Sidebar;
