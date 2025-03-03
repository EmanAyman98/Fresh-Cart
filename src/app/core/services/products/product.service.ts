import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

constructor( private _HttpClient:HttpClient,){}


getAllProducts():Observable<any>{
 return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
}

getSpacificProduct(id:string|null):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
}

}



