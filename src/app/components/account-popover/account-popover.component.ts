import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-popover',
  templateUrl: './account-popover.component.html',
  styleUrls: ['./account-popover.component.scss'],
})
export class AccountPopoverComponent implements OnInit {
  @Input() showEditModal: () => void;
  @Input() showPasswordEditModal: () => void;
  constructor() { }

  ngOnInit() {}

}
