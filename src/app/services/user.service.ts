import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userProfile = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<User | null> {
    return this.userProfile.asObservable();
  }

  getUserInfoFromApi() {
    console.log('go to api and get data');
    const newProfile: User = {
      firstName: 'Steven',
      lastName: 'Espinosa',
      userName: 'smespinosa',
      formId: 10,
    };

    //push new value to userProfile, anything observing (.subscribe()) getUserProfile will respond however they are supposed to
    this.userProfile.next(newProfile);
  }

  logIn(userName: string, password: string): Observable<any> {
    //methods from httpclient are observables, not a promise.  .subscribe to get the results
    return this.http.post('http://localhost:3000/api/login', {
      userName,
      password,
    });
  }
}
