import React, { createContext, useState, useEffect } from 'react';
const context = createContext({ defaultValue: null });
const API = 'http://localhost:3030';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch(`${API}/auth/facebook/callback`, {
            method: 'get',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
            .then(res => res.json())
            .then(res => console.log('res', res))
            .then(res => setUser(res))
        // .catch(err => {
        //     console.log('error',err)
        // });
    }, []);
    return (
        <context.Provider value={user}>
            {children}
        </context.Provider>
    );
};
UserProvider.context = context;
export default UserProvider;
