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
import { EditProfileGuideComponent } from './shared/guide/components/edit-profile-guide/edit-profile-guide.component';
import { DashboardTouristComponent } from './shared/tourist/dashboard-tourist/dashboard-tourist.component';
import { EditProfileTouristComponent } from './shared/tourist/components/edit-profile-tourist/edit-profile-tourist.component';
import { MatchesComponent } from './shared/tourist/components/matches/matches.component';
import { GuideProfileReadonlyComponent } from './shared/tourist/components/guide-profile-readonly/guide-profile-readonly.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard-tourist', component: DashboardTouristComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'edit-profile-guide', component: EditProfileGuideComponent },
  { path: 'edit-profile-tourist/:uid', component: EditProfileTouristComponent },
  { path: 'matches/:uid', component: MatchesComponent },
  { path: 'guide-profile-readonly/:touristUid/:guideUid', component: GuideProfileReadonlyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
