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
    this.bleService.wifiSetSuccess.subscribe(() => {
      this.noticeService.hideLoading();
      this.noticeService.showToast('Wifi设置成功');
    })
  }

  connect() {
    if (!this.ap || !this.password) {
      return
    }
    this.noticeService.showLoading('Setting up WiFi...', 100000000)
    this.bleService.sendWifiData({ssid: this.ap, password: this.password})
  }

}
