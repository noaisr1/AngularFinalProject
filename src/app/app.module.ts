import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './shared/common/dashboard/dashboard.component';
import { SignInComponent } from './shared/common/sign-in/sign-in.component';
import { SignUpComponent } from './shared/common/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './shared/common/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './shared/common/verify-email/verify-email.component';
import { AuthService } from './shared/common/auth/auth.service';
import { GuideService } from './shared/guide/service/guide.service';
import { TouristService } from './shared/tourist/service/tourist.service';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { TouristHomePageComponent } from './shared/tourist/components/tourist-home-page/tourist-home-page.component';
import { GuideHomePageComponent } from './shared/guide/components/guide-home-page/guide-home-page.component';
import { EditProfileGuideComponent } from './shared/guide/components/edit-profile-guide/edit-profile-guide.component';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileTouristComponent } from './shared/tourist/components/edit-profile-tourist/edit-profile-tourist.component';
import { DashboardTouristComponent } from './shared/tourist/dashboard-tourist/dashboard-tourist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatchesComponent } from './shared/tourist/components/matches/matches.component';
import { AgGridModule } from 'ag-grid-angular';
import {MatButtonModule} from '@angular/material/button';
import { NavBarTouristComponent } from './shared/tourist/nav-bar-tourist/nav-bar-tourist.component';
import { GuideProfilePageComponent } from './shared/guide/components/guide-profile-page/guide-profile-page.component';
import { GuideProfileReadonlyComponent } from './shared/tourist/components/guide-profile-readonly/guide-profile-readonly.component';
import { ImageUploadComponent } from './shared/common/image-upload/image-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    FooterComponent,
    HeaderComponent,
    TouristHomePageComponent,
    GuideHomePageComponent,
    EditProfileGuideComponent,
    EditProfileTouristComponent,
    DashboardTouristComponent,
    MatchesComponent,
    NavBarTouristComponent,
    GuideProfilePageComponent,
    GuideProfileReadonlyComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDialogModule,
    AgGridModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, TouristService, GuideService],
  bootstrap: [AppComponent]
})
export class AppModule { }
