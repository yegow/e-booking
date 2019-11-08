export class Review {
    userId?: number;
    propertyId?: number;
    user?: any;
    property?: any;
    comment: string;
    rating: 1 | 2 | 3 | 4 | 5;
}
