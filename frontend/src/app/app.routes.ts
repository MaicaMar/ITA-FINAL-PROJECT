import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './utils/auth.guard';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [

  { path: '', redirectTo: 'homePage', pathMatch: 'full' },
  { path: 'homePage', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'homePage', pathMatch: 'full' }
];
