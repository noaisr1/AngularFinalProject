import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor() { }
}

export class Guide {
  uid?: string;
  email: string;
  age: number;
  tourismTypes: string[];
  languages: string[];
  hasPoliceCertification: boolean;
}