import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Categoriesdata } from '../../../../core/models/categoriesdata.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-category',
  imports: [RouterLink],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.css',
})
export class PopularCategoryComponent {

  
  private readonly categoriesService = inject(CategoriesService);
  CategoryList: WritableSignal<Categoriesdata[]> =  signal<Categoriesdata[]>([]);

  ngOnInit(): void {
  this.getallCategoriesData()
  }


  getallCategoriesData():void{
this.categoriesService.getAllCategories().subscribe({
next :(res)=>{
this.CategoryList.set(res.data)
}
})
  }

}
