import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private readonly API = environment.API + 'authenticate';

  // private formi: FormGroup;

  public user = {username: '', password: ''};

  private token: string;

  constructor(private http: HttpClient, private router: Router) {}



  ngOnInit() {
  }

  doure() {
    this._doure().subscribe((header) => {
      alert(this.token);
      this.router.navigate(['homeLogged']);
    }, () => alert('erro'));
  }

  _doure(): Observable < any > {

    return this.http.post(this.API, { username: this.user.username, password: this.user.password },  {
      observe: 'response'
     })
     .pipe(take(1))
       .pipe(
          tap( response => {
            this.token = response.headers.get('Authorization');
            console.log(this.token);
            return response;
          }));

  }

    handleError() {
      alert('erro');
    }

}
