import React, { useState } from "react";
import cn from "classnames";
import { useSelector } from 'react-redux';
import styles from "./Page.module.sass";
import Sidebar from "../Sidebar";
import Header from "../Header";
import i18n from "../../Services/I18n/i18n";

const Page = ({ wide, children, title }) => {
  const language = useSelector(state => state.language);
  const [visible, setVisible] = useState(false);


  React.useEffect(() => {
    i18n.changeLanguage(language.language);
  }, [language.language]);

  return (
    <>
      <div className={styles.page}>
        <Sidebar className={cn(styles.sidebar, { [styles.visible]: visible })}  onClose={() => setVisible(false)} />
        <Header onOpen={() => setVisible(true)} />
        <div className={styles.inner}>
          <div className={cn(styles.container, { [styles.wide]: wide, })} >
            {title && <div className={cn("h3", styles.title)}>{title}</div>}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;