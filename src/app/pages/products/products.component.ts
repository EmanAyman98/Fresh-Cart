import { WhishlistService } from './../../core/services/wishlist/whishlist.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  allProducts!:IProduct[]
  private ProductService = inject(ProductService)
  private _WhishlistService = inject(WhishlistService)
  private _CartService = inject(CartService)
  private toastr = inject(ToastrService)
  ngOnInit(): void {
    this.ProductService.getAllProducts().subscribe({
      next:(res)=>{
        this. allProducts = res.data
        console.log(this. allProducts)
      }


    })


}

addtoCart(p_id:string){
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
    
}
