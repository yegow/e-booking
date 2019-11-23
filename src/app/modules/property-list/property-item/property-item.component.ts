import { Component, OnInit, Input } from '@angular/core';

import { server } from 'src/app/services/config';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
})
export class PropertyItemComponent implements OnInit {
  @Input() property;
  loadedOrError = false;

  imagesUrl = server.url + '/ebooking/assets/images/properties/';

  constructor() { }

  ngOnInit() {
    console.log(this.property);
  }

  hideSpinner() {
    this.loadedOrError = true;
  }

}
