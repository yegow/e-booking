import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/schemas/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {
  @Input() properties: Property[];
  url = 'https://students.njoka.net/ebooking/assets/images/properties';
  constructor() { }

  ngOnInit() {
  }

}
