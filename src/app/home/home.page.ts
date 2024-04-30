import { Component } from '@angular/core';
import { CharacteristicList } from '../configs/ble.config';
import { BleService } from '../services/ble.service';
import { ModalController, Platform } from '@ionic/angular';
import { ScanModalComponent } from '../components/scan-modal/scan-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  get device() {
    return this.bleService.device
  }

  colors = []

  characteristicList = CharacteristicList

  get dataCache() {
    return this.bleService.dataCache
  }

  constructor(
    private bleService: BleService,
    private modalCtrl: ModalController,
    private platform: Platform
  ) { }

  async scanDevice() {
    await this.bleService.init();
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      this.bleService.scan_web()
      return
    } else {
      this.openScanModal();
    }
    // this.openScanModal();
  }

  async openScanModal() {
    const modal = await this.modalCtrl.create({
      component: ScanModalComponent,
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6],
      handle: true,
    });

    modal.onDidDismiss().then(() => {
      // 关闭modal框后，刷新休假数据
    });

    modal.present();
  }

}
