import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BarndsService } from '../../core/services/brands/barnds.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands-details',
  imports: [RouterLink , CurrencyPipe],
  templateUrl: './brands-details.component.html',
  styleUrl: './brands-details.component.css',
})
export class BrandsDetailsComponent implements OnInit{

      private readonly activatedRoute= inject(ActivatedRoute);
      private readonly brandServices= inject(BarndsService)
      private readonly  cartService = inject(CartService)
      private readonly toastrService = inject(ToastrService)
      private readonly platform = inject(PLATFORM_ID)

      brandId :WritableSignal<string| null> = signal<string| null>(null)
      brandName: WritableSignal<string | null> = signal(null);
products: WritableSignal<any[]> = signal([]);


ngOnInit(): void {
  this.brandID()
  this.getSpecificbrand()
}
      brandID():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlparams)=>{
        this.brandId.set(urlparams.get('id')
)
      }
    })
  }



   getSpecificbrand():void{
    this.brandServices.getSpecificBrands(this.brandId()).subscribe({
next :(res)=>{
      this.products.set(res.data);


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
