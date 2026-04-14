import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WishdataResponse } from '../../models/wishdata.interface';
import { LogwishRespose } from '../../models/logwish.interface';


@Injectable({
  providedIn: 'root',
})
export class WishService {

    private readonly httpClient = inject(HttpClient);

    addProductToWish(productid:string):Observable<WishdataResponse>{
       return this.httpClient.post<WishdataResponse>(environment.base_url + `/api/v1/wishlist` , {
    "productId": productid
});
      }


       getLoggedUserWish():Observable<LogwishRespose>{
       return this.httpClient.get<LogwishRespose>(environment.base_url + `/api/v1/wishlist`);
      }


        
          removeProductFromWish(ProductID: string): Observable<any> {
          return this.httpClient.delete<any>(environment.base_url + `/api/v1/wishlist/${ProductID}`);
        }

}
