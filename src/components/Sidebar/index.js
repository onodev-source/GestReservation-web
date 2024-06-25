import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
import Help from "./Help";
import Image from "../Image";

const navigation = [
    {
        title: "Home",
        icon: "home",
        url: "/",
    },
    {
        title: "Packages",
        slug: "Packages",
        icon: "diamond",
        add: false,
        dropdown: [
            {
                title: "Products",
                url: "/products/dashboard",
            },
            {
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
        title: "Reservations",
        slug: "reservations",
        icon: "store",
        dropdown: [
            {
                title: "Reservations",
                url: "/reservations/reservationList",
            },
            {
                title: "Refunds",
                url: "/income/refunds",
            },
            {
                title: "Agenda",
                url: "/reservations/agenda",
                counter: "8",
                colorCounter: "#F2D45F",
            },
        ],
    },
    {
        title: "Income",
        icon: "pie-chart",
        url: "/income/earning",
    },
];

const navigationFoot = [
    {
        title: "Notifications",
        icon: "notification",
        url: "/notification",
    },
    {
        title: "Settings",
        icon: "setting",
        url: "/settings",
    },
    {
        title: "Logout",
        icon: "lock",
        url: "/shop",
    },
];

const Sidebar = ({ className, onClose }) => {
    const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <>
            <div
                className={cn(styles.sidebar, className, {
                    [styles.active]: visible,
                })}
            >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24" />
                </button>
                <Link className={styles.logo} to="/" onClick={onClose}>
                    <Image
                        className={styles.pic}
                        src="/images/logo_onograph.png"
                        srcDark="/images/logo_onograph.png"
                        alt="Core"
                    />
                </Link>
                <div className={styles.menu}>
                    {navigation.map((x, index) =>
                        x.url ? (
                            <NavLink className={styles.item}  activeClassName={styles.active} to={x.url}  key={index}  exact  onClick={onClose}>
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <Dropdown
                                className={styles.dropdown}
                                visibleSidebar={visible}
                                setValue={setVisible}
                                key={index}
                                item={x}
                                onClose={onClose}
                            />
                        )
                    )}
                </div>
                <button className={styles.toggle}  onClick={() => setVisible(!visible)}>
                    <Icon name="arrow-right" size="24" />
                    <Icon name="close" size="24" />
                </button>
                <div className={styles.foot}>
                    
                    {navigationFoot.map((x, index) =>
                        x.url && (
                            <NavLink className={styles.item}  activeClassName={styles.active} to={x.url}  key={index}  exact  onClick={onClose}>
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        )
                    )}
                    <Theme className={styles.theme} visibleSidebar={visible} />
                </div>
            </div>
            <Help
                visible={visibleHelp}
                setVisible={setVisibleHelp}
                onClose={onClose}
            />
            <div
                className={cn(styles.overlay, { [styles.active]: visible })}
                onClick={() => setVisible(false)}
            ></div>
        </>
    );
};

export default Sidebar;
