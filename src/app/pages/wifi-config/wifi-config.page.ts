import { Component, OnInit } from '@angular/core';
import { BleService } from 'src/app/services/ble.service';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-wifi-config',
  templateUrl: './wifi-config.page.html',
  styleUrls: ['./wifi-config.page.scss'],
})
export class WifiConfigPage implements OnInit {

  ap;
  password;

  constructor(
    private bleService: BleService,
    private noticeService: NoticeService
  ) { }

  ngOnInit() {
  }

  connect() {
    if (!this.ap || !this.password) {
      return
    }

    let res = this.bleService.sendWifiData({ssid: this.ap, password: this.password})
    if (res) {
      this.noticeService.showToast('wifi设置成功')
    } else {
      this.noticeService.showToast('wifi设置失败')
    }
  }

}
