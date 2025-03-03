import { Routes } from '@angular/router';
import { AuthenticationComponent } from './layouts/auth-layout/authentication/authentication.component';
import { MainComponent } from './layouts/main-layout/main/main.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/gurd/auth.guard';

export const routes: Routes = [
    {path:'',component:AuthenticationComponent,children:[
        {path:'login',component:LoginComponent,title:'login'},
        {path:'register',loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:'register'}
    ]},

    {path:'',component:MainComponent,canActivate:[authGuard],children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent, title:'Home',},
    {path:'products',loadComponent:()=>import("./pages/products/products.component").then((c)=>c.ProductsComponent), title:'Producst'},
    {path:'categories',loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent), title:'Categories'},
    {path:'brands',loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent), title:'Brand'},
    {path:'cart',loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent), title:'Cart'},
    {path:'checkout/:c_id',loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent), title:'check out'},
    {path:'allorders',loadComponent:()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent), title:'allorders'},
    {path:'productDetails/:p_id',loadComponent:()=>import('./pages/product-details/product-details.component').then((c)=>c.ProductDetailsComponent), title:'Details'},
    {path:'**',component:NotFoundComponent, title:'Error 404'}
    ]},
    
   
];
