import {useRouter} from "next/router";
import {useEffect} from "react";
import useAuth from "./api/auth/login";

export function ProtectRoute(Component) {
    return () => {
        const {user, isAuthenticated, loading} = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (isAuthenticated === false && loading === false) {
                router.push('/login');
            }
        }, [loading, isAuthenticated]);

        return (<Component {...arguments} />)
    }
}