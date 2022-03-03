import { Optional } from '@angular/core';
import { Product } from './product';

export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    size: number;
    hight: number;

    constructor(product: Product, s: number,h?:number) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
        this.size=s;
        this.hight=h;
    }
}
