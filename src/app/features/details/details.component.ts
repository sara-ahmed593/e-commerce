import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Productdetails } from '../../core/models/productdetails.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute= inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  

  productId :WritableSignal<string| null> = signal<string| null>('')
    productDetails: WritableSignal<Productdetails> =  signal<Productdetails>({} as Productdetails);
  
  ngOnInit(): void {
    this.getproductId();
    this.getSpecificProductData();
  }

  getproductId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlparams)=>{
        this.productId.set(urlparams.get('id')
)
      }
    })
  }

  getSpecificProductData():void{
    this.productsService.getspecific(this.productId()).subscribe({
      next:(res)=>{
        this.productDetails.set(res.data)
      }
    })

  }
}
