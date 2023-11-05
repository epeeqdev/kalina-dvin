export interface User {
    accessToken: string;
    createdAt: string;
    email: string;
    isAdmin: boolean;
    updatedAt: string;
    username: string;
    _id: string;
}

export interface UserContext {
    setData: (data: User | null) => void;
    data: User | null;
}
