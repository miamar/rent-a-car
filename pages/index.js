import Home from "./home";
import {ProtectRoute} from "./router";

const IndexPage = (props) => <Home {...props} />;

export default ProtectRoute(IndexPage);