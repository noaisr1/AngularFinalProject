import { Injectable, NgZone } from '@angular/core';
import { Tourist, UserData, Guide } from "../services/user";
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
  private uid: string;
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
  SignIn(email: string, password: string): void {
    console.log(email, password);
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this._userData = this.afAuth.authState;
        this.afs.collection<UserData>('users')
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe((user) => {
            console.log(user);
            this.currentUser = user;
            this.currentUser$.next(this.currentUser);
            if( ! firebase.auth().currentUser.emailVerified){
              window.alert("Please Verify Your Email Account");
              this.router.navigate(['sign-in']);
            }
            else{
              this.router.navigate(['dashboard']);
            }
          });
      }).catch((error) => {
        console.log(error.message);
        window.alert(error);
      });
  }

  // Sign up with email/password
  SignUp( userData: UserData, password: string ) {
    console.log(userData.email, password);

     this.afAuth.createUserWithEmailAndPassword(userData.email, password)
      .then(res => {
        console.log(res);
        this.uid = res.user.uid;
        if (res) {
          this.afs.collection('users').doc(res.user.uid)
            .set({
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phoneNumber: userData.phoneNumber,
              tourist: (userData.tourist == undefined)? false: userData.tourist,
              guide: (userData.guide == undefined)? false: userData.guide,
              hasCar: userData.hasCar
            }).then(value => {
              this.afs.collection<UserData>('users')
                .doc<UserData>(res.user.uid)
                .valueChanges()
                .subscribe(user => {
                  console.log(user);
                  if (user) {
                    this.currentUser$.next(user);
                  }
                  this.SendVerificationMail();
                });
            });
        }
      })
      .catch((error) => {
        console.log(`Something went wrong ${error.message}`);
        window.alert(error);
      })
  }

  get userData(): Observable<firebase.User> {
    return this._userData;
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

  AddTourist(tourist: Tourist) {
    const touristRef: AngularFirestoreDocument<any> = this.afs.doc(`tourists/${this.currentUser.uid}`);
    const data: Tourist = {
      email: tourist.email,
      tourismType: tourist.tourismType,
      groupType: tourist.groupType,
      language: tourist.language,
    }
    return touristRef.set(data, {
      merge: true
    })
  }

  AddGuide(userData:UserData, password: string, guide: Guide) {
    this.afAuth.createUserWithEmailAndPassword(userData.email, password)
      .then(res => {
        console.log(res);
        this.uid = res.user.uid;
        if (res) {
          this.afs.collection('users').doc(res.user.uid)
            .set({
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phoneNumber: userData.phoneNumber,
              tourist: (userData.tourist == undefined)? false: userData.tourist,
              guide: (userData.guide == undefined)? false: userData.guide,
              hasCar: userData.hasCar
            }).then(value => {
              this.afs.collection<UserData>('users')
                .doc<UserData>(res.user.uid)
                .valueChanges()
                .subscribe(user => {
                  console.log(user);
                  if (user) {
                    this.currentUser$.next(user);
                  }
                  const guideRef:  AngularFirestoreDocument<any> = this.afs.doc(`guides/${this.uid}`);
    
                  const data: Guide = {
                    email: guide.email,
                    age: guide.age,
                    tourismTypes: guide.tourismTypes,
                    languages: guide.languages,
                    hasPoliceCertification: guide.hasPoliceCertification
                  }
                  
                  guideRef.set(data, {
                      merge: true
                  });
                  guideRef.delete;
                  this.SendVerificationMail();
                });
            });
        }
      })
      .catch((error) => {
        console.log(`Something went wrong ${error.message}`);
        window.alert(error);
      })
      
  }
}