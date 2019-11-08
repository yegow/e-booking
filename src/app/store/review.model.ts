export class Review {
    userId: number;
    propertyId: number;
    comment: string;
    property?: any;
    user?: any;
    rating: 1 | 2 | 3 | 4 | 5;
}
