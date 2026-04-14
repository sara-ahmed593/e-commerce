import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

   private readonly authService = inject (AuthService);
     private readonly router = inject (Router);
        private readonly fb = inject (FormBuilder);


 registerform !: FormGroup
   
 ngOnInit(): void {
   this.createFromInit()
 }

 createFromInit():void{
  this.registerform =  this.fb.group({

     name: ["", [Validators.required , Validators.minLength(3)]],
     email : ["" , [Validators.required , Validators.email]],
    password : ["" , [ Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]],
     rePassword : ["" , [ Validators.required]],
          phone : ["", [ Validators.required , Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/
)]],

  } ,  { validators: [this.handelConfirmationPassword] 
 });
 }
 
onsubmitregisterform():void{
   if(this.registerform.valid){
  console.log(this.registerform.value)

  this.authService.sendRegisterdata(this.registerform.value).subscribe({
    next: (res)=>{
     if(res.message === "success"){
    this.registerform.reset();  
  this.router.navigate(['/login']);
   }
      
    },
   })
   }
     else{
    this.registerform.markAllAsTouched();
  }
 }

handelConfirmationPassword(group:AbstractControl){
const password = group.get("password")?.value
const repassword = group.get("rePassword")?.value
if(password !== repassword && repassword !== ""){
 group.get("rePassword")?.setErrors({mismatch: true})
 return {mismatch: true};
}
else{
  return null;
}
 }

}
