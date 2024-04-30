import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BleService } from 'src/app/services/ble.service';

@Component({
  selector: 'app-scan-modal',
  templateUrl: './scan-modal.component.html',
  styleUrls: ['./scan-modal.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true
})
export class ScanModalComponent implements OnInit {

  get deviceList() {
    return this.bleService.deviceList
  }

  // deviceList = [
  //   , , , , , , , , , ,
  // ]

  constructor(
    private bleService: BleService
  ) { }

  ngOnInit() {
    this.scan()
  }

  scan() {
    this.bleService.scan()
  }

  reScan() {
    this.bleService.deviceList = []
    this.bleService.scan()
  }

  select(device) {
    this.bleService.connect(device.device)
  }

}
