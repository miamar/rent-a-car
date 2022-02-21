import React, {createContext, useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUserFromCookies() {
            setLoading(true);
            const token = Cookies.get('token');

            if (token) {
                const loginResult = await fetch("/api/get-user", {
                    method: "POST",
                    body: JSON.stringify({id: parseInt(token)}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json())

                if (loginResult && loginResult.user) {
                    setUser(loginResult.user)
                }
            }

            setLoading(false)
        }

        loadUserFromCookies();
    }, []);

    const login = async (values) => {

        const loginResult = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())

        if (loginResult && loginResult.user) {
            setUser(loginResult.user)
            Cookies.set('token', loginResult.user.id, {expires: 60});
            router.push("/");
        } else {

        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{isAuthenticated: !!user, user, login, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export default function useAuth() {
    return useContext(AuthContext);
};

