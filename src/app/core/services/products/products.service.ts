import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductDataResponce } from '../../models/product-data.interface';
import { ProductdetailsResponce } from '../../models/productdetails.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getAllProduct(page:number=1 , limit:number=10):Observable<ProductDataResponce>{
   return this.httpClient.get<ProductDataResponce>(environment.base_url + `/api/v1/products?page=${page}&limit=${limit}`);
  }

  getspecific(product_id : string|null):Observable<ProductdetailsResponce>{
   return this.httpClient.get<ProductdetailsResponce>(environment.base_url + `/api/v1/products/${product_id}`);
  }

  searchProducts(value: string |null):Observable<any> {
  return this.httpClient.get<any>(environment.base_url + `/api/v1/products?keyword=${value}`
  );
}

}
