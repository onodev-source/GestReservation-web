import React from "react";
import cn from "classnames";
import styles from "./Login.module.sass";
import Item from "../Item";
import TextInput from "../../../components/TextInput";
import { useTranslation } from "react-i18next";

const Login = ({ className, onChange, formUpdate }) => {
  const {t} = useTranslation()
 
  return (
    <Item
      className={cn(styles.card, className)}
      title={t('sign.signin_connexion')}
      classTitle="title-purple"
    >
      <div className={styles.fieldset}>
        <TextInput  className={styles.field}
          label={t('form.old_password')}
          name="old-password"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          onChange={onChange}
          icon="lock"
          required
        />
        <div className={styles.row}>
          <TextInput
            className={styles.field}
            label={t('form.new_password')}
            name="new-password"
            type="password"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            onChange={onChange}
            //value={formUpdate.password}
            required
          />
          <TextInput
            className={styles.field}
            label={t('form.confirm_password')}
            name="confirm-password"
            type="password"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            onChange={onChange}
            //value={formUpdate.password}
            required
          />
        </div>
        <button className={cn("button-stroke", styles.button)}>
          {t('words.edit_pass')}
        </button>
      </div>
    </Item>
  );
};

export default Login;
