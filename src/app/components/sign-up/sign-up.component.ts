import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Guide, Tourist, UserData } from 'src/app/shared/services/user';
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
    private fb: FormBuilder
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

      // Guide form fields
      age: ['', [Validators.required]],
      selectedTourismTypes: [],
      hasPoliceCertification: ['', [Validators.required]],
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
        this.authService.AddGuide(this.user, this.form.get('password').value, guide);
      }
      if(this.user.tourist) {
        let tourist = new Tourist();
        tourist.email = this.user.email;
        tourist.groupType = this.selectedGroupType;
        tourist.language = this.selectedLanguage;
        tourist.tourismType = this.selectedType;
        this.authService.AddTourist(tourist);
      }
    }
    return true;
    
  }

  setUserData(user: UserData){
    this.user.email = user.email;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.phoneNumber = user.phoneNumber;
    (this.userType.value == "Tourist") ? this.user.tourist = true : this.user.guide = true;
    (this.hasCar.value == "Yes") ? this.user.hasCar = true: this.user.hasCar = false;

    
  }
  
}
