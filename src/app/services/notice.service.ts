import { Injectable } from '@angular/core';
import {
  ToastController,
  AlertController,
  LoadingController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  loading;

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  async hideLoading() {
    if (typeof this.loading != 'undefined')
      await this.loading.dismiss();
    return
  }

  async showLoading(msg, duration=3000) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      duration: duration,
    });

    this.loading.present();
  }

  async showToast(msg) {
    this.hideLoading();
    console.log(msg);
    let toast;

    toast = await this.toastCtrl.create({
      message: msg.toString(),
      duration: 3000,
      position: 'bottom',
    })
    toast.present()
  }
}
