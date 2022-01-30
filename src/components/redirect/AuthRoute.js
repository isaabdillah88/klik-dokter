import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const AuthRoute = ({ children, ...rest }) => {
    const { token } = useSelector((state) => state.auth);
    return token ? <Loading /> : <Route {...rest} />;
};

export default AuthRoute;
