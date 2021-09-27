import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './shared/verify-email/verify-email.component';
import { AuthService } from './shared/auth/auth.service';
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
    EditProfileGuideComponent
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
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, TouristService, GuideService],
  bootstrap: [AppComponent]
})
export class AppModule { }
