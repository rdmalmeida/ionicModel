import { User } from './../model/User';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import {  HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {


  public user: User = {username: '', password: '', enabled: true, email: '', dataCadastro: new Date(), confirm: ''};

  public newUser: User = {username: '', password: '', enabled: true, email: '', dataCadastro: new Date(), confirm: ''};

  constructor(private router: Router, private loginService: LoginService) { }

  public showRegisterForm = false;

  public errorMsg = '';
  public errorMsg2 = '';



  ngOnInit() {
  }

  logar() {

    this.loginService.logar(this.user).subscribe((header) => {

      this.router.navigate(['home']);

    }, (a) => this.handleError(a, 1));
  }

  saveUser(form: HTMLFormElement, btn: HTMLButtonElement) {
    btn.disabled = true;

    this.loginService.saveUser(this.newUser).subscribe( (resp) => {
        this.errorMsg2 = 'Usuário cadastrado com sucesso!';
        form.reset();
        btn.disabled = false;
    }, (out) => {
      // console.log(out);
      this.handleError(out, 2);
      btn.disabled = false;
    });
  }

  handleError(a, form) {

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

  showCadastro() {
    this.showRegisterForm = !this.showRegisterForm;
  }

}
