export class UserData {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    emailVerified: string;
    phoneNumber: number;
    tourist?: boolean;
    guide?: boolean;
    hasCar: boolean;
}

export class Tourist {
    uid?: string;
    email: string;
    tourismType: string;
    groupType: string;
    language: string;
}

export class Guide {
    uid?: string;
    email: string;
    age: number;
    tourismTypes: string[];
    languages: string[];
    hasPoliceCertification: boolean;

}