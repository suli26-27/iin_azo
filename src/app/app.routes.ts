import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { EmployeeComponent } from './employee-component/employee-component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'employee', component: EmployeeComponent}
];
