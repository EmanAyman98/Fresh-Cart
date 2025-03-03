import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../shared/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

  constructor(private _HttpClient:HttpClient) { }

  addToWishlist(productId: string):Observable<any>{
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{productId})
  }
}
