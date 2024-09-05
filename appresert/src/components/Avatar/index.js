
import cn from "classnames";
import styles from "./Avatar.module.sass";
//import { useSelector } from "react-redux";

const Avatar = ({ width, height, editPhoto, onClick, user, classname, children}) => {
    //const user = useSelector((state) => state.user);
    const Component = onClick ? 'button' : 'div'

    if (user?.photo === '' || user?.photo === null) {
        return (
            <Component onClick={onClick} className={cn(styles.head, styles.noPhoto, classname)} style={{width: width, height: height, }}>
                <span>{user?.username.slice(0, 2)}</span>
                {children}
            </Component>
        )
    } else {
        return (
            <Component className={cn(styles.head, classname)} onClick={onClick} style={{width: width, height: height, }}>
                <img src={user?.photo} alt="Avatar" />
                {children}
            </Component>
        )
    }
}

export  default Avatar;