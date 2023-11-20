import React, { createContext } from 'react';
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';

export const Authcontext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const authInfo = {

    }
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default AuthProvider;