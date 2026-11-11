import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  builder = inject(FormBuilder)
  auth = inject(AuthService)
  router = inject(Router)

  loginForm = this.builder.group({
    name: ['mari'],
    password: ['titok']
  })

  login() {
    console.log("Belépés...")
    console.log(this.loginForm.value)

    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        // localStorage.setItem("token", res.accessToken)
        localStorage.setItem("token", res.data.token)
        this.auth.loginSuccess()
        this.router.navigate(['employee'])
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
