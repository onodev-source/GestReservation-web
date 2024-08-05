import { useRouteError } from "react-router-dom";
import styles from "./Errow.module.sass";

const Error404View = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className={styles.error}>
            <img src='/images/content/error404.png' className={styles.errorImage} alt="osahan" />
            <div className={styles.errorContent}>
                <h2>Oh no! Where did you go?</h2>
                <p className={styles.text} style={{marginBottom: (error?.statusText || error?.message) ? '10px' : '22px'}}>
                    We can’t seem to find the page you were looking for.
                </p>
                {(error?.statusText || error?.message) && (
                    <p style={{marginBottom: '22px'}}>
                        <i>{error?.statusText || error?.message}</i>
                    </p>
                )}
                <a href={`/`} className={styles.link}>
                    <span>Back To Home</span>
                </a>
            </div>
        </div>
    );
}

export default Error404View;
