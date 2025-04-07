import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";

const AuthGuard = ({ props, isAuthPage = false }) => {
    const access_token = useSelector((state) => state.users.access_token);
    const authenticated = useSelector((state) => state.users.authenticated);
    
    // Pour les pages d'authentification (SignUp, SignIn, etc.)
    if (isAuthPage) {
        if (authenticated && access_token !== "") {
            return <Navigate to="/" replace={false} />;
        } else {
            return props;
        }
    } 
    // Pour les pages protégées qui nécessitent une connexion
    else {
        if (authenticated && access_token !== "") {
            return props;
        } else {
            return <Navigate to="/sign-in" replace={false} />;
        }
    }
};

export { AuthGuard};

/*import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import RequestDashboard from "../Services/Api/ApiServices";
import { Routes } from "../Constants";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import ForgotPassword from "../screens/ForgotPassword";
import VerifyAccount from "../screens/VerifyAccount";
import VerifyEmailResetPass from "../screens/VerifyEmailResetPass";

const AuthGuard = ({ props }) => {
    const access_token = useSelector((state) => state.users.access_token);
    const authenticated = useSelector((state) => state.users.authenticated);
    
    // Vérification sécurisée si props existe et a un type
    if (!props || !props.type) {
        return <SignIn />;
    }
    
    // Détecter les composants d'authentification de manière plus fiable
    const componentName = props.type.displayName || props.type.name || '';
    const isAuthComponent = ['SignIn', 'SignUp', 'ForgotPassword', 'VerifyAccount', 'VerifyEmailResetPass'].includes(componentName);

    if (authenticated && access_token !== "") {
        if (isAuthComponent) {
            return <Navigate to="/" replace={false} />;
        } else {
            return props;
        }
    } else {
        // Pour les composants d'authentification, on les affiche même sans être authentifié
        if (componentName === "SignUp") {
            return <SignUp />;
        } else if (componentName === "ForgotPassword") {
            return <ForgotPassword />;
        } else if (componentName === "VerifyAccount") {
            return <VerifyAccount />;
        } else if (componentName === "VerifyEmailResetPass") {
            return <VerifyEmailResetPass />;
        } else {
            // Pour toute autre page protégée, rediriger vers SignIn
            return <SignIn />;
        }
    }
};

const useUser = () => {
    const users = useSelector(state => state.users);
    const [authenticated, setAuthenticated] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function getCurrentCreator() {
            let response = RequestDashboard('auth/users/me/', 'GET', '', users.access_token);
            if (response.status === 200) {
                // TODO: dispach to redux
                setAuthenticated(true);
            }
            else if (response.status === 401) {
                setAuthenticated(false);
                navigate(Routes.SIGN_IN);
            }
        }
        getCurrentCreator();
    });

    return authenticated;
};

export { AuthGuard, useUser };*/