import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn , Router} from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {

   const router = inject(Router);
   const platform = inject(PLATFORM_ID);
if(isPlatformBrowser(platform)){
  const token = localStorage.getItem("usertoken");
  if(token){
 return true
  }
  else{
 return router.parseUrl("/login")
  }
}
else{
  return true ;
}

};
