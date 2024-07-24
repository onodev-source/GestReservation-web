import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
//import Help from "./Help";
import Image from "../Image";
import Modal from "../Modal";      
import Logout from "../../screens/Logout";
import { Routes } from "../../Constants";

const navigation = [
    {
        id: 1,
        title: "Home",
        icon: "home",
        url: Routes.HOME,
    },
    {
        id: 2,
        title: "Packages",
        slug: "Packages",
        icon: "package",
        add: false,
        dropdown: [
            {
                id: 21,
                title: "Products",
                url: Routes.PRODUITS_DASH,
            },
            {
                id: 22,
                title: "Packages",
                url: Routes.PACKAGES,
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
        url: Routes.CUSTOMERS_DASH,
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
        icon: "reservation",
        dropdown: [
            {
                id: 41,
                title: "Reservations",
                url: Routes.RESERVATION_DASH,
            },
            {
                id: 42,
                title: "Agenda",
                url: Routes.AGENDA_DASH,
                counter: "8",
                colorCounter: "#F2D45F",
            },
        ],
    },
    {
        id: 5,
        title: "Income",
        icon: "pie-chart",
        url: Routes.INCOME_DASH,
    },
];

const navigationFoot = [
    {
        id: 6,
        title: "Notifications",
        icon: "notification",
        url: Routes.NOTIFICATIONS,
    },
    {
        id: 7,
        title: "Settings",
        icon: "setting",
        url: Routes.SETTINGS,
    },
    {
        id: 8,
        title: "Logout",
        icon: "logout",
    },
];

const Sidebar = ({ className, onClose }) => {
    const location = useLocation();
    //const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
  

    return (
        <>
            <div className={cn(styles.sidebar, className, {   [styles.active]: visible, })} >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24" />
                </button>
                <Link className={styles.logo} to={Routes.HOME} onClick={onClose}>
                    <Image className={styles.pic} src="/images/logo_onograph.png" srcDark="/images/logo-onograph-blanc.png" alt="Core" />
                </Link>
                <div className={styles.menu}>
                    {navigation.map((x, index) =>
                        x.url ? (
                            <NavLink className={cn(styles.item, {[styles.active] : location.pathname === x.url})}  activeClassName={styles.active} to={x.url}  key={index}  exact  onClick={onClose}>
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <Dropdown   className={cn(styles.dropdown, {[styles.dropPack] : x.id === 2})} location={location} visibleSidebar={visible}  setValue={setVisible} key={index} 
                             item={x} onClose={onClose}/>
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
                            <NavLink className={cn(styles.item, {[styles.active] : location.pathname === x.url})}  activeClassName={styles.active} to={x.url}  key={index}  exact  onClick={onClose}>
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <NavLink className={cn(styles.item, {[styles.active] : location.pathname === x.url}, styles.iconFoot)}  activeClassName={styles.active}  key={index}  exact  onClick={() => setVisibleModal(true)}>
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
            {/*<Help  visible={visibleHelp}  setVisible={setVisibleHelp}  onClose={onClose}/>*/}
            <div  className={cn(styles.overlay, { [styles.active]: visible })} onClick={() => setVisible(false)}></div>
        </>
    );
};

export default Sidebar;
