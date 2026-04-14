import { CartDataResponse } from './../../models/cart-data.interface';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CartService {
    private readonly httpClient= inject (HttpClient);

    cartCount: WritableSignal< number> = signal <number>(0)

    addProductToCart(ProductID: string): Observable<CartDataResponse> {
    return this.httpClient.post<CartDataResponse>(environment.base_url + '/api/v2/cart', {
      productId:ProductID
    });
  }


  
    getLoggedUserCart(): Observable<CartDataResponse> {
    return this.httpClient.get<CartDataResponse>(environment.base_url + '/api/v2/cart');
  }

  
    updateCartProductQuantity(ID: string , countNumber: number): Observable<CartDataResponse> {
    return this.httpClient.put<CartDataResponse>(environment.base_url + `/api/v2/cart/${ID}`, {
      count:countNumber
    });
  }


  
    removeProductFromCart(ProductID: string): Observable<CartDataResponse> {
    return this.httpClient.delete<CartDataResponse>(environment.base_url + `/api/v2/cart/${ProductID}`);
  }

  
    clearUserCart(): Observable<any> {
    return this.httpClient.delete<any>(environment.base_url + '/api/v2/cart');
  }

}
