export interface Nanny {
    nannyId: string;
    about: string;
    avatar_url: string;
    birthday: string;
    characters: string[];
    education: string;
    experience: string;
    kids_age: string;
    location: string;
    name: string;
    price_per_hour: number;
    rating: number;
    reviews?: Review[];
}

interface Review {
    reviewer: string;
    rating: number;
    comment: string;
}