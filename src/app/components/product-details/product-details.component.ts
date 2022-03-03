import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Color } from 'src/app/common/color';
import { Size } from 'src/app/common/size';
import { Heelhight } from 'src/app/common/heelhight';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  productColor: Product = new Product();
  colors: Color[];
  chosedColor: boolean = false;
  chosedSize: boolean = false;
  chosedHeel: boolean = false;
  products: Product[] = [];
  sizes: Size[] = [];
  size: number;
  hights: Heelhight[]=[];
  hight: number;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )

    this.productService.getProductColors(theProductId).subscribe(
      data => {
        this.colors = data;
      }
    );

    this.productService.getProductSizes(theProductId).subscribe(
      data => {
        this.sizes = data;
        this.sizes.sort((a, b) => a.id - b.id);
      }
    );

    this.productService.getProductHights(theProductId).subscribe(
      data => {
        this.hights = data;
        this.hights.sort((a, b) => a.id - b.id);
        console.log(this.hights.length);
      }
    );


    this.productService.getProductListColor().subscribe(
      data => {
        this.products = data;
      }
    );

  }

  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product,this.size,this.hight);
    this.cartService.addToCart(theCartItem);
    this.chosedSize=false;
  }

  addToCart1() {

    console.log(`Adding to cart: ${this.productColor.id}, ${this.productColor.unitPrice}`);
    const theCartItem = new CartItem(this.productColor, this.size, this.hight);
    this.cartService.addToCart(theCartItem);
    this.chosedColor = false;
    this.chosedSize=false;
    this.chosedHeel=false;
  }

  choseColor(imageUrl: string) {
    this.chosedColor = true;
    this.product.imageUrl = imageUrl;
    for (let tempColor of this.colors) {
      if (tempColor.imageUrl == imageUrl) {
        for (let tempProd of this.products) {
          if (tempProd.imageUrl == tempColor.imageUrl) {
            this.productColor = tempProd;
          }
        }
      }
    }
  }

  choseSize(size: string){
    this.chosedSize=true;
    console.log(size);
    this.size= +size;
  }

  choseHeel(heel: string){
    this.chosedHeel=true;
    console.log(heel);
    this.hight= +heel;
  }

}
