import React from "react";
import styles from "./logout.module.sass";
import cn from "classnames";

const Logout = () => {
  return (
    <div className={styles.success}>
      <div className={styles.icon}>
        <span role="img" aria-label="firework">
          📴
        </span>
      </div>
      <div className={styles.info}>Quit ?</div>
      <div className={cn("h2", styles.price)}>Logout Account</div>
      <div className={styles.text}>
        Are you sure wan’t logout from <span>tam@ui8.net </span>account ? 
      </div>
      <button className={cn("button", styles.button)}>Logout</button>
    </div>
  );
};

export default Logout;
