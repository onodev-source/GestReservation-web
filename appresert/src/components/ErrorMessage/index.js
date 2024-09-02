
import cn from "classnames";
import Icon from "../Icon";
import styles from "./ErrorMessage.module.sass";

const ErrorMessage = ({message, onClose}) => {
    return(
        <div className={cn(styles.errorSubmit, { [styles.success]: message.includes('successfully') })}>
            <div>{message}</div>
            <button className={styles.close} onClick={onClose}>
                <Icon name="close" size="20" />
            </button>
        </div>
    )
}

export default ErrorMessage;