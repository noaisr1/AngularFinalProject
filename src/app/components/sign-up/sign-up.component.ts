import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserData } from 'src/app/shared/services/user';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  ages: number[]=[];
  selectedAge = 0;
  tourismTypes: string[] = ['Culinary', 'Culture', 'Night life', 'Sports', 'Business', 'Family', 'Nature', 'Historical'];
  user: UserData = new UserData();
  guideFlag: boolean = false;

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

      // Guide fields
      age: ['', [Validators.required]],
      selectedTourismTypes: [],
    })

    this.form.valueChanges.subscribe( res => {
      if (res.userType == 'Guide'){
        this.guideFlag = true;
      } else {
        this.guideFlag = false;
      }
    })

    for (var i = 1; i < 100; i++) {
      this.ages[i] = i;
    }

  }

  selectAll() {
    this.form.get('selectedTourismTypes').patchValue(this.tourismTypes)
  }

  unselectAll() {
    this.form.get('selectedTourismTypes').patchValue([])
  }

  toggleCheckAll(values: any) {
    if ( values.currentTarget.checked ) {
      this.selectAll();
    } else {
      this.unselectAll();
    }
  }

  get userType() {
    return this.form.get('userType');
  }
  get hasCar() {
    return this.form.get('hasCar');
  }

  signUp() {
    this.submitted = true;
    if(!this.form.valid) {
      return false;
    } else {
      let tmpUser = JSON.stringify(this.form.value);
      let userJson = JSON.parse(tmpUser) as UserData;
      this.setUserData(userJson);
      this.authService.SignUp(this.user, this.form.get('password').value);
    }
    return true;
    
  }

  setUserData(user: UserData){
    this.user.email = user.email;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.phoneNumber = user.phoneNumber;
    (this.userType.value == "Tourist") ? this.user.tourist = true : this.user.guide==true;
    (this.hasCar.value == "Yes") ? this.user.hasCar = true: this.user.hasCar = false;
    console.log(this.user);
  }
}
