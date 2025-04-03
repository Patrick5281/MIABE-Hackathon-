import { createContext, useContext } from "react";
import { Timestamp } from "firebase/firestore"; // Ou de Supabase selon votre configuration
import { userDocument } from "@/types/user";
import useSupabaseAuth from "@/hooks/use-supabase-auth";

const defaultUserDocument: userDocument = {
  uid: '', 
  email: null,
  how_did_here: '',
  creation_date: Timestamp.now(), // Utilise Timestamp de Firebase/Firestore
  onboardingIsCompleted: false,
  displayName: '',
  expertise: '',
  biography: ''
};

const authUserContext = createContext({
    authUser: null as any,
    authUserIsLoading: true,
});

interface Props {
    children: React.ReactNode;
}

export function AuthUserProvider({ children }: Props) {
    const auth = useSupabaseAuth();
   
    return (
        <authUserContext.Provider
            value={{
                authUser: auth.authUser,
                authUserIsLoading: auth.authUserIsLoading,
            }}
        >
            {children}
        </authUserContext.Provider>
    );
}

export const useAuth = () => useContext(authUserContext);