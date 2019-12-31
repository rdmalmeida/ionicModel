import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
  styleUrls: ['./home-logged.component.scss'],
})
export class HomeLoggedComponent implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.isEnabled().then((ativo) => {
      if (!ativo) {
        this.menuCtrl.enable(true, 'menu1');
        this.menuCtrl.swipeGesture(true, 'menu1').then((a) => console.log('ativando rolagem menu::' + a));
      }
    });
  }

}
