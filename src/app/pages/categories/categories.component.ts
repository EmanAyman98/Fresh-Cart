import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../shared/environment/environment';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  categoryData!:ICategory[]
  private _CategoriesService = inject(CategoriesService)

  ngOnInit(): void {
   this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      this.categoryData = res.data
      console.log("Our Categories: ",this.categoryData)
    }
   })
  }
}
