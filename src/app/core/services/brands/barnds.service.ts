import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CartDataResponse } from '../../models/cart-data.interface';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BarndsService {
    private readonly httpClient= inject (HttpClient);


   getAllBrands(): Observable<any> {
      return this.httpClient.get<any>(environment.base_url + '/api/v1/brands');
    }


   
    getSpecificBrands(brandId: string| null) {
  return this.httpClient.get<any>(
    environment.base_url + `/api/v1/products?brand=${brandId}`
  );
}


}
