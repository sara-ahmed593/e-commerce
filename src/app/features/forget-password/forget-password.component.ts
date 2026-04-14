import { Router } from '@angular/router';
import { AuthService } from './../../core/auth/services/auth.service';
import { Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, WritableSignal, signal ,inject} from '@angular/core';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  step:WritableSignal<number>= signal<number>(1);

  emailControl: FormControl = new FormControl('' , [Validators.required , Validators.email])
  resetCodeControl: FormControl = new FormControl('' , [Validators.required ])
  newPasswordControl: FormControl = new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ])


submitEmail(e: SubmitEvent):void{
e.preventDefault()
if(this.emailControl.valid){
const data = {
  email: this.emailControl.value,
}

this.authService.forgetPassword(data).subscribe({
    next: (res)=>{
      if(res.statusMsg == 'success'){
      console.log(res);
      this.step.set(2)
      }
    }
})
}
}

submitResetCode(e: SubmitEvent):void{
e.preventDefault()
if(this.resetCodeControl.valid){
const data = {
  resetCode: this.resetCodeControl.value,
}

this.authService.verifyResetCode(data).subscribe({
    next: (res)=>{
if(res.status == 'Success'){
      console.log(res);
      this.step.set(3)
      }      
    }
})
}
}


submitNewPassword(e: SubmitEvent):void{
e.preventDefault()
if(this.emailControl.valid && this.newPasswordControl.valid){
const data = {
  email: this.emailControl.value,
  newPawword: this.newPasswordControl.value
}

this.authService.resetPassword(data).subscribe({
    next: (res)=>{
     this.router.navigate(['/login'])
      
    }
})
}
}

}
