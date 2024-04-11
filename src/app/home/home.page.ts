import { Component } from '@angular/core';
import { CharacteristicList } from '../ble.config';
import { BleService } from '../services/ble.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  colors = []

  characteristicList = CharacteristicList

  constructor(
    private bleService: BleService
  ) { }

  async scanDevice() {
    await this.bleService.init();
    this.bleService.scan();
  }

  connect() {

  }
}
