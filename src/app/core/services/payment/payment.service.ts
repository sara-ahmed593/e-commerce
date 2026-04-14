import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateSessionResponse, PaymentDataResponse } from '../../models/payment-data.interface';
import { UserData } from '../../models/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
      private readonly httpClient= inject (HttpClient);

         createCashOrder(cartID: string|null , data:object): Observable<PaymentDataResponse> {
          return this.httpClient.post<PaymentDataResponse>(environment.base_url + `/api/v2/orders/${cartID}`,data);
        }

          getUserOrder(userID: string |null ): Observable<UserData[]> {
          return this.httpClient.get<UserData[]>(environment.base_url + `/api/v1/orders/user/${userID}`);
        }


          createVisaOrder(cartID: string|null , data:object): Observable<CreateSessionResponse> {
          return this.httpClient.post<CreateSessionResponse>(environment.base_url + `/api/v1/orders/checkout-session/${cartID}?url=${environment.url}`,data);
        }
}
