import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { EmployeeComponent } from './employee-component/employee-component';
import { authGuard } from './shared/auth-guard';
import { NopageComponent } from './nopage-component/nopage-component';
import { PositionComponent } from './position-component/position-component';
import { ProjectComponent } from './project-component/project-component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { 
        path: 'employee', 
        component: EmployeeComponent, 
        canActivate: [authGuard]
    },
    { 
        path: 'position', 
        component: PositionComponent, 
        canActivate: [authGuard]
    },
    { 
        path: 'project', 
        component: ProjectComponent, 
        canActivate: [authGuard]
    },
    { path: '**', component: NopageComponent}
];
