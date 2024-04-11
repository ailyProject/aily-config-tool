import { Component, OnInit } from '@angular/core';
import { BleService } from 'src/app/services/ble.service';

@Component({
  selector: 'app-wifi-config',
  templateUrl: './wifi-config.page.html',
  styleUrls: ['./wifi-config.page.scss'],
})
export class WifiConfigPage implements OnInit {

  ap;
  password;

  constructor(
    private bleService: BleService
  ) { }

  ngOnInit() {
  }

  connect() {


  }

}
