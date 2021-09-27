import { Injectable, NgZone } from '@angular/core';
import { Guide } from "../../guide/service/guide.service";
import { Tourist } from '../../tourist/service/tourist.service';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _userData: Observable<firebase.User>; // Save logged in user data
  public currentUser: UserData | null;
  private currentUser$ = new BehaviorSubject<UserData>(null); // The '$' applies to the fact we have stream of values we can subscribe to.

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public afStorage: AngularFireStorage

  ) {
    // Getting data of logged in user:
    this._userData = afAuth.authState;
    this._userData.subscribe(user => {
      if (user) {
        this.afs.collection<UserData>('users', ref => ref.where('email','==',user.email)).valueChanges()
          .subscribe(users => {
            this.currentUser = users[0];
            this.currentUser$.next(users[0]); // next is pushing the data to subscribers. 
          });
      }
    })
  }
  
  
  CurrentUser(): Observable<UserData> {
    return this.currentUser$.asObservable();
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
            // if (!firebase.auth().currentUser.emailVerified) {
            //   window.alert("Please Verify Your Email Account");
            //   this.router.navigate(['sign-in']);
            // }
            // else {
              this.router.navigate(['dashboard']);
           // }
          });
      }).catch((error) => {
        console.log(error.message);
        window.alert(error);
      });
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

  /**
   * SignUp functions add user to 'users' collection,
   * and tourist/guide with the same uid to the matching collection (tourists/guides) 
   */


  SignUpTourist(userData: UserData, password: string, tourist: Tourist) {
    let uid = this.generateUid(userData.firstName, userData.lastName);
    console.log(uid);
    this.afAuth.createUserWithEmailAndPassword(userData.email, password)
      .then(res => {
        if (res) {
          this.afs.collection('users').doc(uid)
            .set({
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phoneNumber: userData.phoneNumber,
              tourist: (userData.tourist == undefined) ? false : userData.tourist,
              guide: (userData.guide == undefined) ? false : userData.guide,
              hasCar: userData.hasCar
            }).then(value => {
              this.afs.collection<UserData>('users')
                .doc<UserData>(uid)
                .valueChanges()
                .subscribe(user => {
                  console.log(user);
                  if (user) {
                    this.currentUser$.next(user);
                  }
                  const touristRef: AngularFirestoreDocument<any> = this.afs.doc(`tourists/${uid}`);
                  const data: Tourist = {
                    email: tourist.email,
                    tourismType: tourist.tourismType,
                    groupType: tourist.groupType,
                    language: tourist.language,
                  }
                  touristRef.set(data, {
                    merge: true
                  })
                  touristRef.delete;
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

  SignUpGuide(userData: UserData, password: string, guide: Guide) {
    let uid = this.generateUid(userData.firstName, userData.lastName);
    console.log(uid);
    this.afAuth.createUserWithEmailAndPassword(userData.email, password)
      .then(res => {
        if (res) {
          this.afs.collection('users').doc(uid)
            .set({
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phoneNumber: userData.phoneNumber,
              tourist: (userData.tourist == undefined) ? false : userData.tourist,
              guide: (userData.guide == undefined) ? false : userData.guide,
              hasCar: userData.hasCar,
            }).then(value => {
              this.afs.collection<UserData>('users')
                .doc<UserData>(uid)
                .valueChanges()
                .subscribe(user => {
                  console.log(user);
                  if (user) {
                    this.currentUser$.next(user);
                  }
                  const guideRef: AngularFirestoreDocument<any> = this.afs.doc(`guides/${uid}`);

                  const data: Guide = {
                    email: guide.email,
                    age: guide.age,
                    tourismTypes: guide.tourismTypes,
                    languages: guide.languages,
                    hasPoliceCertification: guide.hasPoliceCertification,
                    stars: 0
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

  generateUid(firstName: string, lastName: string): string {
    return firstName.charAt(0) + '.' + lastName;
  }
}

export class UserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  photoURL: string;
  emailVerified: string;
  phoneNumber: number;
  tourist?: boolean;
  guide?: boolean;
  hasCar: boolean;
}