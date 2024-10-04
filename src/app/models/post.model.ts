export interface Post {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    company: {
        name: string;
        catchPhrase: string;
    };
}
