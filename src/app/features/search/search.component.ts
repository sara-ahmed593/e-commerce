import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishService } from '../../core/services/wish/wish.service';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [RouterLink , CurrencyPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
    private readonly toastrService = inject(ToastrService);
      private readonly wishService = inject(WishService)
        private readonly cartService = inject(CartService);
          private readonly platform = inject(PLATFORM_ID);

      
    

searchitem:WritableSignal<string |null> = signal<string |null>(null);

  productlist: WritableSignal<any[]> =  signal<any[]>([]);


  ngOnInit(): void {
    this.getSearchName()
  }

  getSearchName():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlparams)=>{
        this.searchitem.set(urlparams.get('value'))
        
        this.getProducts(this.searchitem())

      }
      
    })
  }


  getProducts(value: string|null): void {
  this.productsService.searchProducts(value).subscribe({
    next: (res) => {
      this.productlist.set(res.data)
    },
    
  });
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


  
  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          if (isPlatformBrowser(this.platform)) {

            this.toastrService.success(res.message, " FreshCart ", {
              progressBar: true,
              closeButton: true,
              timeOut: 2500

            });
            this.cartService.cartCount.set(res.numOfCartItems)
          }
        }
      }
    })
  }

}
