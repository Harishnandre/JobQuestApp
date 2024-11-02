import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, isAuthorized, setIsAuthorized }}>
            {props.children}
        </UserContext.Provider>
    );
};
