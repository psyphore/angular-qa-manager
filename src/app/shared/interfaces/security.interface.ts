export interface SignIn {
  login: {
    jwt: string;
  };
}

export interface Me {
  me: {
    id: string;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    role: {
      id: string;
      name: string;
    };
  };
}
