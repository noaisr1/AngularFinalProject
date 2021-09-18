import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  constructor() { }
}

export class Tourist {
  uid?: string;
  email: string;
  tourismType: string;
  groupType: string;
  language: string;
}