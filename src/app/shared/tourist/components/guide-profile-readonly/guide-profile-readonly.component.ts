import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, UserData } from 'src/app/shared/common/auth/auth.service';
import { Review, ReviewsService } from 'src/app/shared/common/services/reviews/reviews.service';
import { Guide } from 'src/app/shared/guide/service/guide.service';

@Component({
  selector: 'app-guide-profile-readonly',
  templateUrl: './guide-profile-readonly.component.html',
  styleUrls: ['./guide-profile-readonly.component.css']
})
export class GuideProfileReadonlyComponent implements OnInit {
  subs: Subscription[] = [];
  isLoading = true;
  touristUid: string;
  guideUid: string;
  guide: Guide;
  selectedLanguages: string[] = [];
  selectedTypes: string[] = [];
  user: UserData;
  firstName: string;
  lastName: string;
  phoneNumber: any;
  photoUrl: string;
  rate: number = 0;
  guideRate: number;
  reviews: Review[] = [];
  constructor(private route: ActivatedRoute, 
              private afs: AngularFirestore, 
              private router: Router,
              private authService: AuthService,
              private reviewsService: ReviewsService) {
                
               }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params: Params) => {
      this.guideUid = params['guideUid'];
      this.touristUid = params['touristUid'];
    })
    this.subs.push(this.reviewsService.getAllReviews().subscribe(async (reviews) => {
      this.reviews = [];
      for(let i = 0 ; i < reviews.length ; i++){
        let review = reviews[i].review;
        if (review.guideUid == this.guideUid){ 
          this.reviews.push(review);
        }
      }
    }))
    this.afs.collection<Guide>('guides').doc(this.guideUid).valueChanges()
      .subscribe(guide => {
        this.guide = guide;
        this.selectedLanguages = guide.languages;
        this.selectedTypes = guide.tourismTypes;
        this.guideRate = this.calculateGuideRate() | 0;
        this.afs.collection<UserData>('users').doc(this.guideUid).valueChanges()
          .subscribe(user => {
            this.user = user;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.phoneNumber = user.phoneNumber;
            this.photoUrl = user.photoUrl;
          });
          this.isLoading = false;
      });
  }

  gotoEditProfile() {
    this.router.navigate(['/edit-profile-tourist', this.touristUid]);
  }
  
  gotoHomePage() {
    this.router.navigate(['dashboard-tourist', this.touristUid]);
  }

  addReview(form: NgForm): void {
    const { message } = form.value;
    if(message){
      this.reviewsService.postReview(message,
        this.touristUid, this.guideUid, this.rate);
      form.resetForm();
    } else{
      confirm(this.touristUid+", You can not post a blank message")
    }
    this.calculateGuideRate();
  } 

  calculateGuideRate() {
    var sum = 0;
    for( var i = 0; i < this.reviews.length; i++ ){
        sum += this.reviews[i].stars;
    }
    var avg = sum/this.reviews.length;
    var strNum = (Math.round(avg * 100) / 100).toFixed(2);
    var rate = +strNum;
    this.updateGuideRate(rate);
    return rate;
    
  }
  
  updateGuideRate(rate: number) {
    const guideRef = this.afs.collection('guides');
    
    guideRef.doc(this.guideUid).update({
      stars: rate
    })
  }

}
