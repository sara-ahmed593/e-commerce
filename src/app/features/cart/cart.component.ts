import { RouterLink } from '@angular/router';
import { Subcategory } from './../../core/models/product-data.interface';
import { CartData } from './../../core/models/cart-data.interface';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, OnInit, inject, PLATFORM_ID, WritableSignal, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService);
  private readonly platform = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);


  cartdetails:WritableSignal<CartData>= signal<CartData>({}as CartData)
  ngOnInit(): void {
    if(isPlatformBrowser(this.platform)){
    const token= localStorage.getItem("usertoken")
    if(token){
      this.getCartData()
    }

    }
  }
  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
            if(res.status == 'success'){
              
this.toastrService.success(res.message , " FreshCart ",{
      progressBar:true,
      closeButton:true,
      timeOut:2500

    });

this.cartdetails.set(res.data)        
    }
      }
    })
  }

  removeItemFromCart(id:string):void{
 this.cartService.removeProductFromCart(id).subscribe({
      next:(res)=>{
      if(res.status == 'success'){
        
this.toastrService.success(res.message , " FreshCart ",{
      progressBar:true,
      closeButton:true,
      timeOut:2500

    });

this.cartdetails.set(res.data) 
  this.cartService.cartCount.set(res.numOfCartItems)

    }
    }
  })
  }


  updateProductQuantity(id: string , count:number):void{
this.cartService.updateCartProductQuantity(id , count).subscribe({
      next:(res)=>{
      if(res.status == 'success'){
        
this.toastrService.success(res.message , " FreshCart ",{
      progressBar:true,
      closeButton:true,
      timeOut:2500

    });

this.cartdetails.set(res.data) 
  this.cartService.cartCount.set(res.numOfCartItems)

    }
    }
  })
  }

  clearCartItems():void{
    this.cartService.clearUserCart().subscribe({
       next:(res)=>{
  if(res.status == 'success'){
        
this.toastrService.success(res.message , " FreshCart ",{
      progressBar:true,
      closeButton:true,
      timeOut:2500

    });

this.cartdetails.set(res.data) 
  this.cartService.cartCount.set(res.numOfCartItems)

    }        
       }
    })

  }
}
