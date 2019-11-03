import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
})
export class PropertyItemComponent implements OnInit {
  @Input() property;
  loadedOrError = false;

  constructor() { }

  ngOnInit() {}

  hideSpinner() {
    this.loadedOrError = true;
  }

}
