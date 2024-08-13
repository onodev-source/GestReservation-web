
import Icon from "../Icon";
import styles from "./ErrorMessage.module.sass";

const ErrorMessage = ({message, onClose}) => {
    return(
        <div className={styles.errorSubmit}>
            <div>{message}</div>
            <button className={styles.close} onClick={onClose}>
                <Icon name="close" size="20" />
            </button>
        </div>
    )
}

export default ErrorMessage;