import { Component } from '@angular/core';
import { CharacteristicList } from '../configs/ble.config';
import { BleService } from '../services/ble.service';

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
    private bleService: BleService
  ) { }

  async scanDevice() {
    await this.bleService.init();
    this.bleService.scan();
  }

}
