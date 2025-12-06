
export class FilterProfuctDto {
    page?:string;
    limit?:string;
    search?:string;
    categoryId?:string;
    minPrice?:string;
    maxPrice?:string;
    sort?:string         // price_asc, price_desc, newest, oldest
}