import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brands/brand.service';
import { Daum, IBrand } from '../../core/interfaces/brands/ibrand';
import { AuthService } from '../../core/services/authentication/auth.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {

  brandsData!:Daum[]

  constructor(private _BrandService: BrandService,private _AuthService:AuthService,) {}
  ngOnInit(): void {
    console.log("UseerInfo: ",this._AuthService.userToken)
    this._BrandService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data
        console.log('Brands:',this.brandsData);
      },error:(err)=>{
        console.log(err)
      }
    });
  }
}
