import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
      private readonly activatedRoute= inject (ActivatedRoute);
      private readonly fb= inject (FormBuilder);
      private readonly paymentService= inject (PaymentService);
      private readonly router= inject (Router);


cartid:WritableSignal<string |null> = signal<string |null>(null);
flag:WritableSignal<string > = signal<string >('cash');
  ngOnInit(): void {
    this.getCartId()
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlparams)=>{
        this.cartid.set(urlparams.get('id'))
      }
    })
  }

  checkoutForm: FormGroup = this.fb.group({

    shippingAddress:this.fb.group({
      details:['' , [Validators.required]],
      phone:['' , [Validators.required , Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)]],
      city:['' , [Validators.required]]
    })

  })

  changePaymentMethod(el:HTMLInputElement):void{
    this.flag.set(el.value)

  }


  submitCheckoutform():void{
    if(this.checkoutForm.valid){

      if(this.flag() === 'cash'){
        this.paymentService.createCashOrder(this.cartid(),this.checkoutForm.value).subscribe({
          next:(res)=>{
            if(res.status ==='success'){
this.router.navigate(['/allorders'])  
            }          
          }
        })

      }
      else if(this.flag() ==='visa'){
 this.paymentService.createVisaOrder(this.cartid(),this.checkoutForm.value).subscribe({
          next:(res)=>{

            if(res.status ==='success'){

              window.open(res.session.url , '_self')
            }            
          }
        })
      }
    }
  }
}
