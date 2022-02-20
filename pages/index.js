import Home from "./home";
import {ProtectRoute} from "../components/router";

const IndexPage = (props) => <Home {...props} />;

export default ProtectRoute(IndexPage);