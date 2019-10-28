import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Property } from '../schemas/property';
import { PropertiesService } from '../services/properties.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit {
  property: Property = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.propertiesService.fetchProperty(+params.get('id'))
      )
    )
    .subscribe(
      resp => { this.property = resp.body.result as Property; },
      error => { this.stateService.changeMessage(error.message); }
    );
  }

  ionViewWillEnter() {
    // this.propertiesService.fetchProperty(this.router.params.id)
    //   .subscribe(
    //     resp => { this.property = resp.body.result; },
    //     error => { this.stateService.changeMessage(error.message); }
    //   );
  }

}
