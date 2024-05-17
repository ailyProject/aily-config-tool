import { Component, OnInit } from '@angular/core';
import { BleService } from 'src/app/services/ble.service';

@Component({
  selector: 'app-chat-log',
  templateUrl: './chat-log.page.html',
  styleUrls: ['./chat-log.page.scss'],
})
export class ChatLogPage implements OnInit {

  get logList() {
    return this.bleService.ailyLogs;
  }

  constructor(
    private bleService: BleService
  ) { }

  ngOnInit() {
    this.bleService.startGetLog();
  }
}
