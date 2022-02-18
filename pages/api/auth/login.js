import React, {createContext, useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import {PrismaClient} from "@prisma/client";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("here", user)

    useEffect(() => {
        async function loadUserFromCookies() {
            setLoading(true);
            const token = Cookies.get('token');
            const agentId = Cookies.get('agent_id');
            //const employeeId = Cookies.get('employee_id');

            if (token && agentId) {
                //api.defaults.headers.Authorization = `Bearer ${token}`;
                //api.defaults.headers.AgentID = `ID ${agentId}`;
                const {data} = await prisma.auth.findMany();

                if (data.success) {
                    setUser(data.data);
                    setLoading(false)
                }
            } else {
                setLoading(false);
            }
        }

        loadUserFromCookies();
    }, []);

    const login = async (values) => {

        setUser(values.email);

        /*
        if (data.token && data.isEmployee !== true) {
            Cookies.set('token', data.token, {expires: 60});

            Cookies.remove('employee_id');
            Cookies.remove('employee_email');

            Cookies.set('agent_id', data.id, {expires: 60});
            Cookies.set('agent_email', data.email, {expires: 60});
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            api.defaults.headers.AgentID = `ID ${data.id}`;
            const {data: salesAgentData} = await api.get('data/sales-personnel');

            if (salesAgentData.success) {
                setUser(salesAgentData.data);
                router.push("/");
            }
        } else */
        if (data.token) {
            Cookies.set('token', data.token, {expires: 60});

            Cookies.remove('agent_id');
            Cookies.remove('agent_email');

            Cookies.set('employee_id', data.id, {expires: 60});
            Cookies.set('employee_email', data.email, {expires: 60});
            //api.defaults.headers.Authorization = `Bearer ${data.token}`;
            //api.defaults.headers.AgentID = `ID ${data.id}`;
            //const employeeData = await prisma.auth.findMany();
            //const {data: employeeData} = await api.get('data/employee');

            //if (employeeData.success) {
            //    setUser(employeeData.data);
            //    router.push("/");
            //}
        }
    };

    const logout = () => {
        Cookies.remove('token');

        Cookies.remove('agent_id');
        Cookies.remove('agent_email');

        Cookies.remove('employee_id');
        Cookies.remove('employee_email');

        localStorage.removeItem('customer_id');
        localStorage.removeItem('cart_data');
        setUser(null);
        window.location.pathname = '/login';
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

