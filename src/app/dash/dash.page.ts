import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { PropertiesService } from '../services/properties.service';
import { SessionStore } from '../store/session.store';
import { VISIBILITY_FILTER } from '../store/property.model';

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
    private propertiesService: PropertiesService,
    private sessionStore: SessionStore,
    ) { }

  ngOnInit() {
    this.propertiesService.fetchProperties({
      ui: {
        filter: VISIBILITY_FILTER.SHOW_ALL,
      },
      active: null,
    }).subscribe();
    this.menuController.enable(true, 'sideMenu');
  }

  // ionViewWillEnter() {
  //
  // }

  logout() {
    this.sessionStore.logout();
    this.router.navigate(['/home']);
  }

}
