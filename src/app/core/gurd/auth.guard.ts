import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _PLATFORM_ID = inject(PLATFORM_ID)
  const _Router = inject(Router) //Router ==> function

  if(isPlatformBrowser(PLATFORM_ID)){
    if(sessionStorage.getItem('token')){
      return true;
    }else{
      _Router.navigate(['/login']);
        return false;
      }
    
  }else{
    return true;
  }
};
