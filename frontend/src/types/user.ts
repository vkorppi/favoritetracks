
export interface UserType {
    firstname: string;
    lastname: string;
    birthdate: string;
    email: string;
    address: string;
    username: string;
    id: string;
    playlist: string;
    admin: boolean;
  }
  
  export interface UserId {
    id: string;
  }
  
  export interface Auhtorization {
    admin: boolean;
    authenticated: boolean;
  }

  export interface CapsulatedLoginAuth {
    login: Auhtorization;
  }
