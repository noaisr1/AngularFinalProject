import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { auth } from 'firebase';
import { AuthService, UserData } from 'src/app/shared/common/auth/auth.service';
import { Tourist } from '../../service/tourist.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-tourist',
  templateUrl: './edit-profile-tourist.component.html',
  styleUrls: ['./edit-profile-tourist.component.css']
})
export class EditProfileTouristComponent implements OnInit {
  @ViewChild('matDialog') matDialog: any;
   // General fields
   form: FormGroup;
   submitted = false;
   ages: number[]=[];
   selectedAge = 0;
   guideFlag: boolean = false;
   touristFlag: boolean = false;
   tourismTypes: string[] = ['Culinary', 'Culture', 'Night life', 'Sports', 'Business', 'Family', 'Nature', 'Historical'];
   languages: string[] = ['English', 'Hebrew', 'Spanish', 'French', 'Portuguese', 'Arabic'];
   
   // Tourist fields
  selectedType: string;
  selectedLanguage: string;
  groupTypes: string[] = ['Family', 'Couple', 'Friends', 'BusinessPartners']
  selectedGroupType: string;
 
  uid: string;
  public user: UserData;
  public tourist: Tourist;
  public isLoading = false;
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private afs: AngularFirestore, 
    public authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.uid = params['uid'];
    })
    this.afs.collection<Tourist>('tourists').doc(this.uid).valueChanges()
      .subscribe(tourist => {
        this.tourist = tourist;
        this.selectedLanguage = tourist.language;
        this.selectedGroupType = tourist.groupType;
        this.selectedType = tourist.tourismType;
        console.log(this.tourist);
      this.afs.collection<UserData>('users').doc(this.uid).valueChanges()
      .subscribe(user => {
        this.user = user
        console.log(this.user);
        this.generateForm();
      });
    });
      
  }

  gotoHomePage() {
    this.authService.currentUser$.next(this.user);
    this.router.navigate(['dashboard-tourist']);
  }

  Save() {
    let tmpDetails = JSON.stringify(this.form.value);
    let newUser = JSON.parse(tmpDetails) as UserData;
    console.log(newUser)
    this.saveUser(newUser);
    this.saveTourist();
    this.dialog.open(this.matDialog);
  }

  saveUser(user: UserData) {
    const userRef = this.afs.collection('users');
    
    userRef.doc(this.uid).update({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber
    })
  }

  saveTourist() {
    console.log(this.selectedGroupType);
    const touristRef = this.afs.collection('tourists');
    touristRef.doc(this.uid).update({
      email: this.user.email, 
      groupType: this.selectedGroupType,
      language: this.selectedLanguage,
      tourismType: this.selectedType
    })
  }

  generateForm() {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

      // Tourist form fields
      selectedLanguageForm: [''],
      selectedTourismType: [''],
      selectedGroupType: ['']

    })

    this.form.setValue({
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,

      // Tourist form fields
      selectedLanguageForm: this.tourist.language,
      selectedGroupType: this.tourist.groupType,
      selectedTourismType: this.tourist.tourismType 
      
   });
  }

}
