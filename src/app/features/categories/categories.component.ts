import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Categoriesdata } from '../../core/models/categoriesdata.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {


  
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
