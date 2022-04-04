import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext<any>(null);

export const AuthProvider: React.FC = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

   


    // Reset errors
    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 7000);
    }, [error]);

    return (
        <AuthContext.Provider
            value={{
                error, // errors messages
                isLoading, // loading state
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

