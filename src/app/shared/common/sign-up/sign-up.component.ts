import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/common/auth/auth.service';
import { UserData } from 'src/app/shared/common/auth/auth.service';
import { Guide } from 'src/app/shared/guide/service/guide.service';
import { Tourist } from 'src/app/shared/tourist/service/tourist.service';
import { AngularFireStorage, AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators'
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  // General fields
  form: FormGroup;
  submitted = false;
  ages: number[]=[];
  selectedAge = 0;
  guideFlag: boolean = false;
  touristFlag: boolean = false;
  user: UserData = new UserData();

  // File Upload 
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  photoURL: any;


  // Guide fields
  tourismTypes: string[] = ['Culinary', 'Culture', 'Night life', 'Sports', 'Business', 'Family', 'Nature', 'Historical'];
  selectedTypes: string[] = [];
  languages: string[] = ['English', 'Hebrew', 'Spanish', 'French', 'Portuguese', 'Arabic']
  selectedLanguages: string[] = [];

  // Tourist fields
  selectedType: string;
  selectedLanguage: string;
  groupTypes: string[] = ['Family', 'Couple', 'Friends', 'BusinessPartners']
  selectedGroupType: string;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      userType: ['',[Validators.required]],
      hasCar: ['', [Validators.required]],
      userPhoto: ['',[]],

      // Guide form fields
      age: ['', this.guideFlag==true? [Validators.required]: []],
      selectedTourismTypes: [],
      hasPoliceCertification: ['', this.guideFlag==true? [Validators.required]: []],
      selectedLanguagesForm: [],

      // Tourist form fields
      selectedLanguageForm: [''],
      selectedTourismType: [''],
      selectedGroupType: ['']

    })

    this.form.valueChanges.subscribe( res => {
      if (res.userType == 'Guide'){
        this.guideFlag = true;
        this.touristFlag = false;
      } 
      if (res.userType == 'Tourist') {
        this.touristFlag = true;
        this.guideFlag = false;
      }
    })

    for (var i = 1; i < 100; i++) {
      this.ages[i] = i;
    }

  }

  onUpload(event: any) {
    // Creating id to photo which is same as uid
    const photoId = this.authService.generateUid(this.form.get('firstName').value, this.form.get('lastName').value);
  
    // Creating reference to storage bucket location
    this.ref = this.afStorage.ref('/images/' + photoId);

    // put method creates an AngularFireUploadTask and start the upload
    this.task = this.ref.put(event.target.files[0]);

    // AngularFireUploadTask provides observable to get uploadProgress value
    this.uploadProgress = this.task.snapshotChanges()
    .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

    // Observe upload progress
    this.uploadProgress = this.task.percentageChanges();
    // Get notify when the download URL is available
    this.task.snapshotChanges().pipe(
      finalize(() => this.photoURL = this.ref.getDownloadURL())
    )
    .subscribe();


  }

  selectAllT() {
    this.form.get('selectedTourismTypes').patchValue(this.tourismTypes)
  }

  unselectAllT() {
    this.form.get('selectedTourismTypes').patchValue([])
  }

  toggleCheckAllT(values: any) {
    if ( values.currentTarget.checked ) {
      this.selectAllT();
    } else {
      this.unselectAllT();
    }
  }

  selectAllL() {
    this.form.get('selectedLanguagesForm').patchValue(this.tourismTypes)
  }

  unselectAllL() {
    this.form.get('selectedLanguagesForm').patchValue([])
  }

  toggleCheckAllL(values: any) {
    if ( values.currentTarget.checked ) {
      this.selectAllL();
    } else {
      this.unselectAllL();
    }
  }



  get userType() {
    return this.form.get('userType');
  }
  get hasCar() {
    return this.form.get('hasCar');
  }

  get hasPoliceCertification(){
    return this.form.get('hasPoliceCertification');
  }

  signUp() {
    this.submitted = true;
    if(!this.form.valid) {
      return false;
    } else {
      let tmpUser = JSON.stringify(this.form.value);
      let userJson = JSON.parse(tmpUser) as UserData;
      this.setUserData(userJson);

      if(this.user.guide) {
        let guide = new Guide();
        guide.age = this.selectedAge;
        guide.email = this.user.email;
        this.hasPoliceCertification.value == true? guide.hasPoliceCertification == true: guide.hasPoliceCertification = false;
        guide.languages = this.selectedLanguages;
        guide.tourismTypes = this.selectedTypes;
        this.authService.SignUpGuide(this.user, this.form.get('password').value, guide);
      }
      if(this.user.tourist) {
        let tourist = new Tourist();
        tourist.email = this.user.email;
        tourist.groupType = this.selectedGroupType;
        tourist.language = this.selectedLanguage;
        tourist.tourismType = this.selectedType;
        this.authService.SignUpTourist(this.user, this.form.get('password').value, tourist);
      }
    }
    return true;
    
  }

  setUserData(user: UserData){
    this.user.email = user.email;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.phoneNumber = user.phoneNumber;
    this.user.photoURL = '/images/'+this.authService.generateUid(this.user.firstName, this.user.lastName);
    (this.userType.value == "Tourist") ? this.user.tourist = true : this.user.guide = true;
    (this.hasCar.value == "Yes") ? this.user.hasCar = true: this.user.hasCar = false;

    
  }
  
}
