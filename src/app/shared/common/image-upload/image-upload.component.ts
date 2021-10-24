import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, UserData } from '../auth/auth.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Output() photoUrl = new EventEmitter<string>();
  isUploading = false;
  subs: Subscription[] = [];
  user: UserData;
  imgUrl: string;
  fileFormat: boolean = false;
  fileIsNull: boolean = false;
  uid: string;
  _uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required])
  });
 
  constructor(public authService: AuthService,
              private afs: AngularFirestore) { }

  async ngOnInit(): Promise<void> {
    this.subs.push(this.authService.CurrentUser().subscribe(user => {
      this.user = user;
      this.uid = this.authService.generateUid(user.firstName, user.lastName);
    }));
  }


 get uploadForm() {
   return this._uploadForm.controls;
 }
  
 onImageChange(e: any) {
   const reader = new FileReader();
   
   if(e.target.files && e.target.files.length) {
     const [file] = e.target.files;
     reader.readAsDataURL(file);
   
     reader.onload = () => {
       this.imgUrl = reader.result as string;
       this._uploadForm.patchValue({
         url: reader.result
       });
  
     };
   }
 }
  
  checkIfImageExists(url: string) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      return true;
    } else {
      return false;
    }
  }

  upload(){
    this.isUploading = true;
    this.fileFormat = false;
    this.fileIsNull = false;
    var newPhotoUrl = this._uploadForm.get('url').value;
    
    if(!newPhotoUrl){
      this.fileIsNull = true;
    }
    
    if(!this.checkIfImageExists(newPhotoUrl)){
      this.fileFormat = true;
    }

    if(this.fileFormat || this.fileIsNull) return;
    else{
        this.photoUrl.emit(newPhotoUrl);
        this.isUploading = false;
      
    }
  }

}
