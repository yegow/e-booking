import { Component, OnInit, Input } from '@angular/core';
import { PropertiesQuery } from 'src/app/store/properties.query';

@Component({
  selector: 'app-properties-popover',
  templateUrl: './properties-popover.component.html',
  styleUrls: ['./properties-popover.component.scss'],
})
export class PropertiesPopoverComponent implements OnInit {
  @Input() setPropertiesFilter: () => void;

  constructor(
    private propertiesQuery: PropertiesQuery
  ) { }

  ngOnInit() {}

}
