import React, { createContext, useContext, useState } from "react";
import { AuthGoogleProfile } from "../shared/models/Auth";
import jwt_decode from "jwt-decode";


interface IAuthContext {
    logged: boolean;
    signIn(emaill: string, password: string): void;
    sigInWithGoogle(credentialToken: string): void;
    signOut(): void;
}

// estado padrão necessário para se criar um Context
const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');

        // O operador "!!" transforma em um retorno lógico. Se tem conteúdo, então verdadeiro. Senão, então false.
        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        if(email === 'logominus@gmail.com' && password === '123') {
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLogged(true);
        }
        else {
            alert('Senha ou usuário inválidos!');
        }        
    }

    const sigInWithGoogle = async (credentialToken: string) => {
        const profile: AuthGoogleProfile = jwt_decode(credentialToken);
        // signIn(profile.email, profile.sub);
        console.log("profile: ", profile);
    }    

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{
            logged,
            signIn,
            signOut,
            sigInWithGoogle,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };