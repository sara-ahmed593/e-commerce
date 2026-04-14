import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { WishService } from '../../core/services/wish/wish.service';
import { isPlatformBrowser } from '@angular/common';
import {  Logwish } from '../../core/models/logwish.interface';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
    private readonly wishService = inject(WishService);
    private readonly cartService = inject(CartService)
    private readonly toastrService = inject(ToastrService)
    private readonly platform = inject(PLATFORM_ID)

    wishlist: WritableSignal<Logwish[]> =signal<Logwish[]>([])


  ngOnInit(): void {
    if(isPlatformBrowser(this.platform)){
    const token= localStorage.getItem("usertoken")
    if(token){
      this.getWishData()

    }
   
  }}

  getWishData():void{
    this.wishService.getLoggedUserWish().subscribe({
      next:(res)=>{
if(res.status ==='success')  {
this.wishlist.set(res.data);
}      
      }
    })
  }


 addProductItemToCart(id:string):void{
this.cartService.addProductToCart(id).subscribe({
  next:(res)=>{
    if(res.status == 'success'){
              if (isPlatformBrowser(this.platform)) {

this.toastrService.success(res.message , " FreshCart ",{
      progressBar:true,
      closeButton:true,
      timeOut:2500

    }); 
  this.cartService.cartCount.set(res.numOfCartItems)
  }}
  }
})
  }


  removeProductItemFromWish(id:string):void{
    this.wishService.removeProductFromWish(id).subscribe({
 next:(res)=>{

if(res.status ==='success')  {
this.toastrService.success(res.message , " FreshCart ",{
      progressBar:true,
      closeButton:true,
      timeOut:2500

    });
    this.wishlist.set(res.data);


}      
}}
    )
  }

}
