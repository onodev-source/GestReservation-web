import React, { useState } from "react";
import cn from "classnames";
import styles from "./Share.module.sass";
import Icon from "../../../../Icon";
import { useTranslation } from "react-i18next";

const socials = [
  {
    icon: "facebook",
    url: "https://www.facebook.com/onograph.online/",
  },
  {
    icon: "twitter",
    url: "https://twitter.com/onograph.online/",
  },
  {
    icon: "instagram",
    url: "https://www.instagram.com/onograph.online/",
  },
];

const Share = ({product, productOrPackImg}) => {
  const {t} = useTranslation()

  const [value, setValue] = useState(window.location.href);
  const [copySuccess, setCopySuccess] = useState(false); // Pour afficher le message de succès

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 9000); // Réinitialiser le succès après 2s
      },
      () => {
        console.error("Failed to copy!");
      }
    );
  };

  return (
    <div className={styles.share}>
      <div className={styles.head}>
        <div className={cn("title-red", styles.title)}>{t('words.share_this')} {product ? t('form.product') : t('form.package')}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.icon}>
          <Icon name="link" size="24" />
        </div>
        <input className={styles.input} type="text" name="site"  value={value} onChange={(e) => setValue(e.target.value)}  readOnly />
        <button className={styles.copy} onClick={handleCopy} disabled={!copySuccess ? false : true}>{copySuccess ? t("words.copied") : t('words.copy')}</button>
      </div>
      <div className={styles.preview}>
        <img src={productOrPackImg} alt="Share" />
      </div>
      <div className={styles.btns}>
        {socials.map((x, index) => (
          <a  className={cn("button-stroke", styles.button)}  href={x.url} target="_blank"  rel="noopener noreferrer"  key={index} >
            <Icon name={x.icon} size="24" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Share;
