import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { ProductService } from './../../core/services/products/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { provideToastr, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
   
    },

  }

  private  readonly _ActivatedRoute:ActivatedRoute = inject(ActivatedRoute)
  private readonly _CartService = inject(CartService)
  private toaster = inject(ToastrService)
  productsID:string | null = null
  productDetails: IProduct = {} as IProduct;

  // Dependency Injection
  constructor(private _ProductService:ProductService, private toastr: ToastrService){}
  addtoCart(p_id:string){
    console.log("productId:",p_id)
    this._CartService.AddProducttoCart(p_id).subscribe({
      next:(res:any)=>{
         console.log(res)
         this.toastr.success(res.message,'FreshCart',{
          closeButton:true,
          timeOut:2000,
        
         })
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.productsID =param.get('p_id') !
        console.log("ProductID:",this.productsID)
      }
    })

    this._ProductService.getSpacificProduct(this.productsID).subscribe({
      next:(res)=>{
        this.productDetails = res.data
        console.log("this our product Details:",this.productDetails)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
}
