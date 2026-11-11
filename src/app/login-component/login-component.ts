import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiResponse } from '../interfaces/api-response';
import { User } from '../interfaces/user';

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
      next: (res: ApiResponse<User>) => {
        console.log(res)
        // localStorage.setItem("token", res.accessToken)
        if(res.success) {
          localStorage.setItem("token", res.data.token)
          this.auth.loginSuccess()
          this.router.navigate(['employee'])
        }else {
          Swal.fire({
            title: 'Hiba! A bejelentkezés sikertelen!',
            icon: "error",
            footer: 'Hibás felhasználónév vagy jelszó!'
          })
        }
      },
      error: (err) => {
        console.error(err)
        Swal.fire({
          title: 'Hiba! A AAA bejelentkezés sikertelen!',
          icon: "error",
          footer: err            
        })
      }
    })
  }
}
