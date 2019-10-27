import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {
  pages = [
    {
      title: 'Properties',
      url: '/dash/properties',
      icon: 'globe'
    },
    {
      title: 'My Properties',
      url: '/dash/properties/mines',
      icon: 'filing'
    },
    {
      title: 'Account',
      url: '/dash/account',
      icon: 'person'
    },
  ];

  constructor(
    private router: Router,
    private menuController: MenuController
    ) { }

  ngOnInit() {
    this.menuController.enable(true, 'sideMenu');
  }

  logout() {
    this.router.navigate(['/home']);
  }

}
