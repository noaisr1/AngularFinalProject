import { NgModule } from '@angular/core';

// Required services for navigation
import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from './shared/common/sign-in/sign-in.component';
import { SignUpComponent } from './shared/common/sign-up/sign-up.component';
import { DashboardComponent } from './shared/common/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './shared/common/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/common/auth/guard/auth.guard';
import { VerifyEmailComponent } from './shared/common/verify-email/verify-email.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
