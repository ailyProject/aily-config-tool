import { Component } from '@angular/core';
import { CharacteristicList } from '../ble.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  characteristicList = CharacteristicList

  constructor() { }

  connect() {

  }
}