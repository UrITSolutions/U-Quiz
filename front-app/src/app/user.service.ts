import { Injectable } from '@angular/core';
import { User } from 'src/model/model.user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Observable<User>;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  getUser(){
    return this.user;
  }
}
