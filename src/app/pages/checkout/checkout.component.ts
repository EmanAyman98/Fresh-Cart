import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/order/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  CartId!:string
  private _ActivatedRoute = inject(ActivatedRoute)
  private _PaymentService = inject(PaymentService)

  detailsForm:FormGroup = new FormGroup({
    details:new FormControl(null,Validators.required),
    phone:new FormControl(null,Validators.required),
    city:new FormControl(null,Validators.required)
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.CartId = param.get('c_id')!
      }
    })
  }
detailsSumbit(){
  console.log(this.detailsForm.value)
  if(this.detailsForm.valid){
    this._PaymentService.checkoutSession(this.CartId,this.detailsForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status == "success"){
          window.open(res.session.url)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
}
