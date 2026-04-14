import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
   private readonly authService = inject (AuthService);
     private readonly router = inject (Router);
        private readonly fb = inject (FormBuilder);


 loginform !: FormGroup
   
 ngOnInit(): void {
   this.createFromInit()
 }

 createFromInit():void{
  this.loginform =  this.fb.group({

     email : ["" , [Validators.required , Validators.email]],
    password : ["" , [ Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]],

 });
 }
 
onsubmitloginform():void{
   if(this.loginform.valid){
  console.log(this.loginform.value)

  this.authService.sendLogindata(this.loginform.value).subscribe({
    next: (res)=>{
     if(res.message === "success"){
    this.loginform.reset();  
      localStorage.setItem("usertoken", res.token);
        localStorage.setItem("userData", JSON.stringify(res.user));

        this.authService.decodeToken()
this.authService.islogged.set(true)

  this.router.navigate(['/home']);
   }
      
    },
   })
   }
     else{
    this.loginform.markAllAsTouched();
  }
 }

}
