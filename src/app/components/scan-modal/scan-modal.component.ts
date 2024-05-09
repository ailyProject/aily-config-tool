import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController, Platform } from '@ionic/angular';
import { BleService } from 'src/app/services/ble.service';
import { NoticeService } from 'src/app/services/notice.service';

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
    private bleService: BleService,
    private notice: NoticeService,
    private modelCtl: ModalController
  ) { }

  ngOnInit() {
    this.scan()
  }

  scan() {
    this.bleService.deviceList = [];
    this.bleService.scan()
  }

  reScan() {
    this.bleService.deviceList = []
    this.bleService.scan()
  }

  select(device) {
    console.log("选择设备: ", device)
    this.notice.showLoading("连接中...")
    this.bleService.connect(device.device).then(res => {
      this.modelCtl.dismiss();
      this.notice.hideLoading();
    })
  }

}
