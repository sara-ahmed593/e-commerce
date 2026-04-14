import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductData } from '../../core/models/product-data.interface';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { WishService } from '../../core/services/wish/wish.service';


@Component({
  selector: 'app-shop',
  imports: [CurrencyPipe, RouterLink, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {


  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly platform = inject(PLATFORM_ID);
  private readonly wishService = inject(WishService)

  pagination: PaginationInstance = {
    id: 'foo', itemsPerPage: 40,
    currentPage: 1,
    totalItems: 0
  }

  productList: WritableSignal<ProductData[]> = signal<ProductData[]>([]);

  ngOnInit(): void {
    this.getallProductsData()
  }


  getallProductsData(): void {
    this.productsService.getAllProduct(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (res) => {
        this.productList.set(res.data)
        this.pagination.totalItems= res.results
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

  pageChanged(page:number):void{
this.pagination.currentPage=page
this.getallProductsData()
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
