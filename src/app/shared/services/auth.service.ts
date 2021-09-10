import { Injectable, NgZone } from '@angular/core';
import { UserData } from "../services/user";
import firebase, { auth, User } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _userData: Observable<firebase.User>; // Save logged in user data
  public currentUser: any;
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,

  ) {
    // Getting data of logged in user:
    this._userData = afAuth.authState;
    this._userData.subscribe( user => {
      if( user ) {
        this.afs.collection<UserData>('users')
        .doc<UserData>(user.uid)
        .valueChanges()
        .subscribe( currentUser => {
          this.currentUser = currentUser;
          this.currentUser.uid = user.uid;
          this.currentUser$.next(currentUser);
        });
      }
    })
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then((user) => {
      return user?.sendEmailVerification();
    })
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }


  // Sign out
  SignOut() {
    this.afAuth.signOut().then(res => {
      console.log(res);
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigate(['sign-in']);

    })
  }

}