import React from "react";
import cn from "classnames";
import styles from "./Theme.module.sass";
import useDarkMode from "@fisch0920/use-dark-mode";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";

const Theme = ({ className, visibleSidebar }) => {
  const darkMode = useDarkMode(false);
  const {t} = useTranslation()

  return (
    <label
      className={cn(className, styles.theme, { [styles.wide]: visibleSidebar })}
    >
      <input
        className={styles.input}
        checked={darkMode.value}
        onChange={darkMode.toggle}
        type="checkbox"
      />
      <span className={styles.inner}>
        <span className={styles.box}>
          <Icon name="sun" size="24" />
          {t('navigation.light')}
        </span>
        <span className={styles.box}>
          <Icon name="moon" size="24" />
          {t('navigation.dark')}
        </span>
      </span>
    </label>
  );
};

export default Theme;
