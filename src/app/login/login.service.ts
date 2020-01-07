import { User } from './../model/User';
import { tap, take, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = environment.API + 'authenticate';
  private readonly API_USERS = environment.API + 'users';


  private token: string;

  private duranteTrs = false;

  constructor(private http: HttpClient) { }

  public logar(user: User): Observable < any > {

    return this.http.post(this.API, { username: user.username, password: user.password },  {
      observe: 'response'
     })
     .pipe(take(1))
       .pipe( timeout(3000) )
         .pipe(
            tap( response => {
              this.token = response.headers.get('Authorization');
              console.log(this.token);
              return response;
            }));
  }


  public saveUser(user: User): Observable<any> {

    if (!this.duranteTrs) {
        this.duranteTrs = true;
        return this.http.post(this.API_USERS, user,  {
          observe: 'response'
        })
        .pipe(take(1))
          .pipe( timeout(3000) )
            .pipe(
                tap( response => {
                  this.duranteTrs = false;
                  return response;
                }, response => {
                  this.duranteTrs = false;
                  return response;
                }));
    }

  }

  public getToken(): string {
    return this.token;
  }

}
