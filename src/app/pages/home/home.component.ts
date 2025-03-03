import { AuthService } from './../../core/services/authentication/auth.service';
import { Subscription } from 'rxjs';
import { IProduct } from './../../core/interfaces/product/iproduct';
import { ProductService } from './../../core/services/products/product.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  imports: [CarouselModule,SearchPipe,FormsModule,RouterLink,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:1350,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1280:{
        items:6
      }
    },
    nav: false
  }
  mainSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:1350,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }
SearchValue:string =''

productData !: IProduct[] 
categoryData !:ICategory[]

productSub!:Subscription
constructor(private _ProductService:ProductService, private _CategoriesService:CategoriesService,private _AuthService:AuthService, private _CartService:CartService,
private toastr: ToastrService){}

ngOnInit(): void {
console.log("UseerInfo: ",this._AuthService.userToken)

  this._ProductService.getAllProducts().subscribe({
    next:(res)=>{
      this.productData = res.data
       console.log(this.productData)
    }
  })
  
  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log("Categories:",res.data)
      this.categoryData = res.data
    }
  })  
}


addtoCart(p_id:string){
  console.log("productId:",p_id)
  this._CartService.AddProducttoCart(p_id).subscribe({
    next:(res:any)=>{
       console.log(res.numOfCartItems)
        this._CartService.cartCount.next(res.numOfCartItems)
       console.log(this._CartService.cartCount)
       this.toastr.success(res.message,'FreshCart',{
        closeButton:true,
        timeOut:2000,
       })
    },
   
  })
}

ngOnDestroy(): void {
  this.productSub?.unsubscribe()
}
}









