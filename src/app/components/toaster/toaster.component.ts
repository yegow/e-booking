import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { StateService } from 'src/app/services/state.service';

class Message {
  message: string;
  header?: string;
  color?: string;
}

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.stateService.currentMessage.subscribe(async msg => {
      if (msg === '') {
        return;
      }
      const toast = await this.showToast({
        message: msg
      });

      toast.present();
    });
  }

  async showToast(m: Message) {
    return await this.toastController.create({
      header: m.header || 'There was an error' ,
      message: m.message,
      color: m.color || 'danger',
      showCloseButton: true,
      closeButtonText: 'Close',
      duration: 3000
    });
  }

}
