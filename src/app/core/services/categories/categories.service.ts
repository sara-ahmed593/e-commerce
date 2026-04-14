import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoriesdataResponce } from '../../models/categoriesdata.interface';
import { SubcategoriesRespoce } from '../../models/subcategories.interface';
import { DataCategoryResponse } from '../../models/data-category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
    private readonly httpClient = inject(HttpClient);


      getAllCategories():Observable<CategoriesdataResponce>{
       return this.httpClient.get<CategoriesdataResponce>(environment.base_url + "/api/v1/categories");
      }
    
      getspecificCategories(categories_id : string | null):Observable<any>{
       return this.httpClient.get<any>(environment.base_url + `/api/v1/categories/${categories_id}`);
      }
      getAllSubCategories():Observable<SubcategoriesRespoce>{
       return this.httpClient.get<SubcategoriesRespoce>(environment.base_url + `/api/v1/subcategories`);
      }
      

      getProductsBySubcategory(subId: string | null):Observable<DataCategoryResponse> {
  return this.httpClient.get<DataCategoryResponse>(
    environment.base_url + `/api/v1/products?subcategory=${subId}`
  );
}

}
