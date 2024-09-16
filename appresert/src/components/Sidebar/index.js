import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.sass";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
//import Help from "./Help";
import Image from "../Image";
import Modal from "../Modal";      
import Logout from "../../screens/Logout";
import { Routes } from "../../Constants";
import { useSelector } from "react-redux";
import i18n from "../../Services/I18n/i18n";



const Sidebar = ({ className, onClose }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const language = useSelector(state => state.language.language)
    const users = useSelector((state) => state.users)
    //const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
  
    const navigation = [
        {
            id: 1,
            title: t('navigation.home'),
            icon: "home",
            url: Routes.HOME,
        },
        {
            id: 2,
            title: t('navigation.packages'),
            slug: "Packages",
            icon: "package",
            add: false,
            dropdown: [
                {
                    id: 21,
                    title: t('navigation.products'),
                    url: Routes.PRODUITS_DASH,
                },
                {
                    id: 22,
                    title: t('navigation.packages'),
                    url: Routes.PACKAGES,
                    counter: "4",
                    colorCounter: "#F2D45F",
                },
            ],
        },
        {
            id: 3,
            title: t('navigation.customers'),
            slug: "customers",
            icon: "profile-circle",
            url: Routes.CUSTOMERS_DASH,
        },
        {
            id: 4,
            title: t('navigation.reservations'),
            slug: "reservations",
            icon: "reservation",
            dropdown: [
                {
                    id: 41,
                    title: t('navigation.reservations'),
                    url: Routes.RESERVATION_DASH,
                },
                {
                    id: 42,
                    title: t('navigation.agenda'),
                    url: Routes.AGENDA_DASH,
                    counter: "8",
                    colorCounter: "#F2D45F",
                },
            ],
        },
        {
            id: 5,
            title: t('navigation.income'),
            icon: "pie-chart",
            url: Routes.INCOME_DASH,
        },
    ];

    const filteredNavigation = users.users.is_customer ? navigation.filter(item => item.id !== 3 && item.id !== 5)  : navigation;

    const navigationFoot = [
        {
            id: 6,
            title: t('navigation.notifications'),
            icon: "notification",
            url: Routes.NOTIFICATIONS,
        },
        {
            id: 7,
            title: t('navigation.settings'),
            icon: "setting",
            url: Routes.SETTINGS,
        },
        {
            id: 8,
            title: t('navigation.log_out'),
            icon: "logout",
        },
    ];

    
    React.useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

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
                    {filteredNavigation.map((x, index) =>
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
