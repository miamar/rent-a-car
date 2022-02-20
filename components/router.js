import {useRouter} from "next/router";
import {useEffect} from "react";
import useAuth from "../context/auth/login";

export function ProtectRoute(Component) {
    const ContainerComponent = ({ children, ...props }) => {
        const {isAuthenticated, loading} = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (isAuthenticated === false && loading === false) {
                router.push('/login');
            }
        }, [loading, isAuthenticated]);

        return (<Component {...props} />)
    };

    return ContainerComponent;
}