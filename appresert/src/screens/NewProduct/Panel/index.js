import React from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../components/Icon";
import Actions from "../../../components/Actions";
import { useTranslation } from "react-i18next";

const Panel = ({ setVisiblePreview, setVisibleSchedule, editPack }) => {
  const {t} = useTranslation()
  const actions = [
    {
      title: "Preview",
      icon: "expand",
      action: () => setVisiblePreview(true),
    },
    {
      title: "Schedule product",
      icon: "calendar",
      action: () => setVisibleSchedule(true),
    },
    {
      title: "Get shareable link",
      icon: "link",
      action: () => console.log("Get shareable link"),
    },
    {
      title: "Clear data",
      icon: "close",
      action: () => console.log("Clear data"),
    },
  ];

  return (
    <div className={cn("panel", styles.panel)}>
      <div className={styles.info}>
        <Icon name="check-all" size="24" />
        {t('words.last_saved')} <span>Oct 4, 2021 - 23:32</span>
      </div>
      <div className={styles.btns}>
        <button className={cn("button-stroke", styles.button)}>
          {t('words.cancel')}
        </button>
        <button className={cn("button", styles.button)}>{t('words.save_change')}</button>
        {/*<Actions
          className={styles.actions}
          classActionsHead={styles.actionsHead}
          classActionsBody={styles.actionsBody}
          classActionsOption={styles.actionsOption}
          items={actions}
          up
        />*/}
      </div>
    </div>
  );
};

export default Panel;
