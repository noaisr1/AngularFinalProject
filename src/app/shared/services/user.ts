export interface UserData {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    emailVerified: string;
    phoneNumber: number;
    tourist?: boolean;
    guide?: boolean;
    specialData: Tourist | Guide;
}

export interface Tourist {
    userData: UserData;
    tourismType: string;
    groupType: string;
    language: string;
    hasCar: boolean;
}

export interface Guide {
    userData: UserData;
    age: number;
    tourismTypes: string[];
    languages: string[];
    hasCar: boolean;
    hasPoliceCertification: boolean;

}