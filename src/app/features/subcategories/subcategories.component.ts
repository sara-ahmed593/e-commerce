import { Subcategories } from './../../core/models/subcategories.interface';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { DataCategory } from '../../core/models/data-category.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subcategories',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css',
})
export class SubcategoriesComponent implements OnInit {
    private readonly activatedRoute= inject(ActivatedRoute);
    private readonly categoriesService= inject(CategoriesService);
    private readonly cartService= inject(CartService);
    private readonly platform= inject(PLATFORM_ID);
    private readonly toastrService= inject(ToastrService);

      SubcategoryId :WritableSignal<string| null> = signal<string| null>(null)
    categoriesdetailslist: WritableSignal<DataCategory[]> =  signal<DataCategory[]>([] );
subcategoryName: WritableSignal<string | null> = signal(null);

      ngOnInit(): void {
        this.categoryID()
        this.getSpecificSubCategory()
      }
  
categoryID():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlparams)=>{
        this.SubcategoryId.set(urlparams.get('id')
      )   
            this.subcategoryName.set(urlparams.get('name'));

           
      }
    })
  }

    getSpecificSubCategory():void{
    this.categoriesService.getProductsBySubcategory(this.SubcategoryId()).subscribe({
next :(res)=>{
this.categoriesdetailslist.set(res.data)


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
