// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { catchError, throwError } from 'rxjs';

// export const resErrorInterceptor: HttpInterceptorFn = (req, next) => {
//   const _ToastrService = inject(ToastrService)
//   return next(req).pipe(
//     catchError((err)=>{
//       console.log('Error from inceptor', err.error.message);
//       //  _ToastrService.error(err.error.message,'FreshCart',{
//       //   closeButton:true,
//       //   timeOut:1000,
//       //   positionClass: 'toast-bottom-right',
//       //  })
//       return throwError(()=>err)
//     })
//   );
// };
