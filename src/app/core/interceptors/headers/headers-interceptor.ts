import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from "@angular/common";

export const headersInterceptor: HttpInterceptorFn = (req, next) => {


   const platform = inject(PLATFORM_ID)
 if(isPlatformBrowser(platform)){
     const token = localStorage.getItem("usertoken");

   if(token){
        if(req.url.includes("cart") || req.url.includes("wishlist") || req.url.includes("orders") || req.url.includes("reviews") ){

       req= req.clone({
    setHeaders:{
      token:token
    }
  
    
   })
  
}}

 }
  return next(req);
};
