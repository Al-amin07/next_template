"use client"
import { getCurrentUser } from "@/services/auth";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react"
import { Toaster } from 'sonner';

export interface IUserContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<IUserContext | null>(null)
export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const handleUser = async () => {
        const user = await getCurrentUser() as IUser;
        setUser(user);
        setIsLoading(false);
    }
    useEffect(() => {
        handleUser();
    }, [isLoading])
    const authInfo = {
        user,
        setUser,
        isLoading,
        setIsLoading
    }
    return (
        <UserContext.Provider value={authInfo}>
            {children}
            <Toaster position="top-center" richColors />
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a UserProvider");
    }
    return context
}
