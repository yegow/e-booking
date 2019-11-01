import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {
  pages = [
    {
      title: 'Properties',
      url: '/dash/property-list',
      icon: 'globe'
    },
    {
      title: 'My Properties',
      url: '/dash/property-list/mines',
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
    private menuController: MenuController,
    private propertiesService: PropertiesService
    ) { }

  ngOnInit() {
    this.propertiesService.fetchProperties({
      filter: 'ALL',
      active: null
    }).subscribe();
    this.menuController.enable(true, 'sideMenu');
  }

  // ionViewWillEnter() {
  //
  // }

  logout() {
    this.router.navigate(['/home']);
  }

}
