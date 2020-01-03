import { MenuController, LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { take, tap, timeout, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  private readonly API = environment.API + 'authenticate';
  private readonly API_USERS = environment.API + 'users';

  public user = {username: '', password: ''};

  public newUser = {username: '', password: '', enabled: true, email: '', dataCadastro: new Date(), confirm: ''};

  private token: string;

  constructor(private http: HttpClient, private router: Router, public loadingCtrl: LoadingController) { }

  public showRegisterForm = false;

  public errorMsg = '';
  public errorMsg2 = '';

  private duranteTrs = false;


  ngOnInit() {
  }

  doure() {
    // this.router.navigate(['home']);

    this._doure().subscribe((header) => {
      console.log(this.token);
      this.router.navigate(['home']);
    }, (a) => this.handleError(a, 1));

  }

  _doure(): Observable < any > {

    return this.http.post(this.API, { username: this.user.username, password: this.user.password },  {
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

    handleError(a, form) {
      // alert(a);
      let mensagem;
      if (a instanceof HttpErrorResponse) {
        if (a.status === 0) {
          mensagem = 'Serviço indisponível, tente novamente mais tarde.';
        }
        if (a.status === 403) {
          mensagem = 'Login ou senha inválidos!';
        }
        if (a.status === 406) {
          mensagem = a.error.mensagem;
        }
      }

      if (form === 1) {
        this.errorMsg = mensagem;
      } else {
        this.errorMsg2 = mensagem;
      }
    }

  saveUser(form: HTMLFormElement, btn: HTMLButtonElement) {

      btn.disabled = true;
      if (!this.duranteTrs) {
          this.duranteTrs = true;
          this.http.post(this.API_USERS, this.newUser,  {
            observe: 'response'
          })
          .pipe(take(1))
            .pipe( timeout(3000) )
              .pipe(
                  tap( response => {
                    this.errorMsg2 = 'Usuário cadastrado com sucesso!';
                    form.reset();
                  })).subscribe((out) => {
                    console.log(out);
                    this.disableButton(btn);
                  }, (a) => {
                    this.disableButton(btn);
                    this.handleError(a, 2);
                  });
      }

    }

  private disableButton(btn: HTMLButtonElement) {
    btn.disabled = false;
    this.duranteTrs = false;
  }

  showCadastro() {
    this.showRegisterForm = !this.showRegisterForm;
  }

}
