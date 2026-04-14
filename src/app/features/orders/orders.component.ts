import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { UserData } from '../../core/models/user-data.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-orders',
  imports: [RouterLink , DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly paymentService = inject(PaymentService)
  private readonly platfom = inject(PLATFORM_ID)

  userID:WritableSignal<string|null>= signal<string|null>(null)
    orderlist: WritableSignal<UserData[]> =  signal<UserData[]>([]);
  

  ngOnInit(): void {
    this.getUserID()
    this.getAllOrders()
  }

  getUserID():void{
    if(isPlatformBrowser(this.platfom)){
      const token= localStorage.getItem('usertoken')
      if(token){
        this.userID.set(JSON.parse( localStorage.getItem('userdecode')!).id)
        

      }

    }
  }

  getAllOrders():void{
    this.paymentService.getUserOrder(this.userID()).subscribe({
      next:(res)=>{
        this.orderlist.set(res)

        
      }
    })
  }
}
