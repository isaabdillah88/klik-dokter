import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const ProductRoute = ({ children, ...rest }) => {
    const { token } = useSelector((state) => state.auth);
    return token ? <Route {...rest} /> : <Loading />;
};

export default ProductRoute;
