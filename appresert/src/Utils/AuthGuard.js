import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import RequestDashboard from "../Services/Api/ApiServices";
import { Routes } from "../Constants";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import ForgotPassword from "../screens/ForgotPassword";

const AuthGuard = ({ props }) => {
    const access_token = useSelector((state) => state.users.access_token);
    const authenticated = useSelector((state) => state.users.authenticated);
    //const id = useParams()

    if (authenticated && access_token !== "") {
        if (props.type.name === "SignIn" || props.type.name === "SignUp" || props.type.name === "ForgotPassword") {
            return <Navigate to="/" replace={false} />;
        } else {
            return props;
        }
    } else {
        if (props.type.name === "SignUp") {
            return <SignUp />;
        } else if(props.type.name === "ForgotPassword"){
            return <ForgotPassword/>
        }
        else {
            return <SignIn/>;
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

export { AuthGuard, useUser };