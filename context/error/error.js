import React, {useContext, useState} from "react";

export const ErrorStateContext = React.createContext(null);

export const ErrorStateProvider = (props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);

    return (
        <ErrorStateContext.Provider value={{
            errorMessage,
            errorVisible,
            setErrorMessage,
            setErrorVisible
        }}>
            {props.children}
        </ErrorStateContext.Provider>
    )
};

export default function useError() {
    return useContext(ErrorStateContext);
}