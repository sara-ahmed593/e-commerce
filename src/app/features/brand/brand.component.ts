import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { BarndsService } from '../../core/services/brands/barnds.service';

@Component({
  selector: 'app-brand',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {
      private readonly barndsService= inject (BarndsService);

        BrandsList: WritableSignal<any[]> =  signal<any[]>([]);


  ngOnInit(): void {
    this.AllBrands()
  }

  AllBrands():void{
    this.barndsService.getAllBrands().subscribe({
      next:(res)=>{
        this.BrandsList.set(res.data)
        
      }
    })
  }
}
