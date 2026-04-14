import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './../../core/auth/services/auth.service';
import { Component, inject, OnInit, computed, PLATFORM_ID, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {

  private readonly flowbiteService = inject (FlowbiteService);
  private readonly authService = inject (AuthService);
  private readonly cartService = inject (CartService);
  private readonly router = inject(Router)
  private readonly platform = inject (PLATFORM_ID);

  searchValue: WritableSignal<string> = signal<string>('');

          count= computed(()=> this.cartService.cartCount())


  logged= computed(()=>this.authService.islogged());
   ngOnInit(): void {

    if(isPlatformBrowser(this.platform)){
      const token = localStorage.getItem("usertoken");
      if(token){
            this.authService.islogged.set(true)
this.getCartData()
      }
    }

    

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  userLogOut():void{
    this.authService.userSignOut()
  }


  getCartData():void{
     this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
            if(res.status == 'success'){

  this.cartService.cartCount.set(res.numOfCartItems)
    }
      }
    })
  }


  search(): void {
  const value = this.searchValue()  

    this.router.navigate(['/search',value]);
      this.searchValue.set('');

  
}

}
