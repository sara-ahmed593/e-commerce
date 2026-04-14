import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../../core/services/cart/cart.service';
import { Component, inject, OnInit, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ProductData } from '../../../../core/models/product-data.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";
import { WishService } from '../../../../core/services/wish/wish.service';

@Component({
  selector: 'app-popular-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css',
})
export class PopularProductComponent implements OnInit{

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishService = inject(WishService)
private readonly toastrService = inject(ToastrService);
private readonly platform= inject(PLATFORM_ID);



  productList: WritableSignal<ProductData[]> =  signal<ProductData[]>([]);

  ngOnInit(): void {
  this.getallProductsData()
  }


  getallProductsData():void{
this.productsService.getAllProduct().subscribe({
next :(res)=>{
this.productList.set(res.data)
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



  addProductItemToWish(id:string):void{
this.wishService.addProductToWish(id).subscribe({
  next:(res)=>{
    if(res.status == 'success'){
      this.toastrService.success(res.message , " FreshCart ",{
      progressBar:true,
      closeButton:true,
      timeOut:2500

    }); 
    }    
  }
})
  }


}
