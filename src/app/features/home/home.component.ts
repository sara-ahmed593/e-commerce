import { Component } from '@angular/core';
import { PopularCategoryComponent } from "./components/popular-category/popular-category.component";
import { PopularProductComponent } from "./components/popular-product/popular-product.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  imports: [PopularCategoryComponent, PopularProductComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
