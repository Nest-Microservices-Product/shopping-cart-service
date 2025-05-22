import { Item } from "./ItemI";

export interface ShoppingCart {
    userId: string;
    items: Array<Item>;
}