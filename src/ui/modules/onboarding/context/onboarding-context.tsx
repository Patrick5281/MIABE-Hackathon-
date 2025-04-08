import React, { createContext, useContext, useState } from "react";

type UserType = "particulier" | "entreprise" | null;

interface OnboardingContextType {
    userType: UserType;
    setUserType: (type: UserType) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userType, setUserType] = useState<UserType>(null);

    return (
        <OnboardingContext.Provider value={{ userType, setUserType }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboardingContext = () => {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error("useOnboardingContext must be used within an OnboardingProvider");
    }
    return context;
}; 