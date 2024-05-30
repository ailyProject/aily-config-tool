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
    this.bleService.updateRes.subscribe((data) => {
      if (data["type"] === 'wifi') {
        this.noticeService.hideLoading();
        if (data["status"] === 1) {
          this.noticeService.showToast('Wifi设置成功');
        } else if (data["status"] === -1) {
          this.noticeService.showToast('Wifi设置失败: SSID未找到');
        } else {
          this.noticeService.showToast('Wifi设置失败: 未知错误');
        }
      }
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
