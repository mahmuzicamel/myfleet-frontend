export interface Customer
{
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    title?: string;
    birthday?: string | null;
    address?: Address | null;
}

export interface Address {
    id: string;
    street: string;
    number: string;
    city: string
    zipcode: string;
}
