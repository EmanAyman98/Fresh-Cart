import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

private readonly _CartService = inject(CartService)
cartData:ICart |null =null
ngOnInit(): void {

  this._CartService.GetLoggedUserCart().subscribe({
    next:(res)=>{
      console.log(res)
      this.cartData = res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

deleteItemFromCart(p_id:string){
  this._CartService.deletaCartItem(p_id).subscribe({
    next:(res)=>{
      this._CartService.cartCount.next(res.numOfCartItems)
      console.log(res.data)
      this.cartData = res.data
      
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

updateCount(p_id:string,count:number){
if(count > 1){
  this._CartService.updateCartProductQuantity(p_id,count).subscribe({
    next:(res)=>{
      console.log(res.data)
      this.cartData = res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
}
