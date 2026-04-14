import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categoriesdata } from '../../core/models/categoriesdata.interface';
import { Subcategories } from '../../core/models/subcategories.interface';

@Component({
  selector: 'app-category-details',
  imports: [RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
    private readonly activatedRoute= inject(ActivatedRoute);

    private readonly categoriesService = inject(CategoriesService);

      categoryId :WritableSignal<string| null> = signal<string| null>(null)
      category:WritableSignal<Categoriesdata> = signal<Categoriesdata>({} as Categoriesdata)
    categoriesdetails: WritableSignal<Subcategories[]> =  signal<Subcategories[]>([] );



      ngOnInit(): void {

             this.categoryID();
       this.getallSubCategory()
    this.getSpecificCategory();

  }

   getallSubCategory():void{
    this.categoriesService.getAllSubCategories().subscribe({
next :(res)=>{
          this.categoriesdetails.set(res.data)
          


}
})

  }

categoryID():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlparams)=>{
        this.categoryId.set(urlparams.get('id')
)


      }
    })
  }


  getSpecificCategory():void{
    this.categoriesService.getspecificCategories(this.categoryId()).subscribe({
next :(res)=>{
this.category.set( res.data)


}
})

  }


  
}
