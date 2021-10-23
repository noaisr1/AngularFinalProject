import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, Timestamp } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guide } from 'src/app/shared/guide/service/guide.service';
import * as firebase from 'firebase';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  currentGuide: Guide;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth){
      
  }

    getAllReviews(): Observable<any>{
      return this.afs.collection<any>('reviews')
      .snapshotChanges().pipe(
        map((actions) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

    postReview(message: string, touristUid: string, guideUid: string, rating: number):void{
      // var dateObj = new Date();
      // var month = dateObj.getUTCMonth() + 1; //months from 1-12
      // var day = dateObj.getUTCDate();
      // var year = dateObj.getUTCFullYear();
      // var newdate = day + "/" + month + "/" + year;
      let review = {
        message: message,
        title: touristUid,
        guideUid: guideUid,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        stars: rating,
      }
      this.afs.collection('reviews').add({
       review
      }).then(res=> {
        this.afs.collection<Guide>('guides', ref => ref.where('uid', '==', guideUid))
        .valueChanges()
        .subscribe((guides) => {
          console.log(guides[0]);
          guides[0].reviews.push(res.id)
        })
      });
    }
}

export class Review {
  date: any;
  title: string; // Always is the tourist uid
  message: string;
  guideUid: string;
  stars: number | 0;
}
