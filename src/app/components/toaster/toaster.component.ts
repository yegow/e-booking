import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { ToastService } from 'src/app/services/toast.service';

class MessageOptions {
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
    private toastService: ToastService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.toastService.currentMessage.subscribe(async msgOpts => {
      if (msgOpts === null) {
        return;
      }
      const toast = await this.showToast(msgOpts);

      toast.present();
    });
  }

  async showToast(m: MessageOptions) {
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
