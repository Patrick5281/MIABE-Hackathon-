import { Timestamp } from "firebase/firestore";

export interface UserInterface{
    uid: string;
    email: string | null;
    displayName: string | null;
    emailVerified: boolean;
    phoneNumber : string | null;
    photoURL : string | null;   
    userDocument?: userDocument;                             
}

export interface userDocument{
    uid: string;
    email: string | null;
    how_did_here: string;
    creation_date: Timestamp;
    onboardingIsCompleted: boolean;
    displayName: string;
    expertise: string;
    biography: string;
    //... 
                                  
}