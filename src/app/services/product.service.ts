import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { Color } from '../common/color';
import { Size } from '../common/size';
import { Heelhight } from '../common/heelhight';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  private colorUrl = 'http://localhost:8080/api/colors';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductColor(theColorId: number): Observable<Product> {
    const cUrl = `${this.colorUrl}/${theColorId}/product`;
    console.log(cUrl);
    return this.httpClient.get<Product>(cUrl);
  }

  getProductColors(theProductId: number): Observable<Color[]> {
    const colorUrl = `${this.baseUrl}/${theProductId}/colors`;

    return this.httpClient.get<GetResponseProductColors>(colorUrl).pipe(
      map(response => response._embedded.colors)
    );
  }

  getProductSizes(theProductId: number): Observable<Size[]> {
    const sizeUrl = `${this.baseUrl}/${theProductId}/sizes`;

    return this.httpClient.get<GetResponseProductSizes>(sizeUrl).pipe(
      map(response => response._embedded.sizes)
    );
  }

  getProductHights(theProductId: number): Observable<Heelhight[]> {
    const heelUrl = `${this.baseUrl}/${theProductId}/heels`;

    return this.httpClient.get<GetResponseProductHights>(heelUrl).pipe(
      map(response => response._embedded.heels)
    );
  }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductListColor(): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.categoryUrl}/3/products`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

interface GetResponseProductColors {
  _embedded: {
    colors: Color[];
  }
}

interface GetResponseProductSizes {
  _embedded: {
    sizes: Size[];
  }
}

interface GetResponseProductHights {
  _embedded: {
    heels: Heelhight[];
  }
}