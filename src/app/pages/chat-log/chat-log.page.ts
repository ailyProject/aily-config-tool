import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BleService } from 'src/app/services/ble.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-chat-log',
  templateUrl: './chat-log.page.html',
  styleUrls: ['./chat-log.page.scss'],
})
export class ChatLogPage implements OnInit {

  page = 1;
  perPage = 10;
  disabled: boolean = false;
  showNoMore: boolean = false;

  logList: any = [];

  // get logList() {
  //   return this.bleService.ailyLogs;
  // }

  constructor(
    private bleService: BleService,
    private httpService: HttpService,
    private cd: ChangeDetectorRef
  ) { }

  getLogByHttp() {
    this.httpService.getLogs(this.bleService.ip, this.page, this.perPage).subscribe(res => {
      console.log(res);
      if (res.status === 200) {
        if (res.data.list.length > 0) {
          console.log(res.data.list)
          this.logList = this.logList.concat(res.data.list);
          this.cd.detectChanges();
        } else {
          this.disabled = true;
          this.showNoMore = true;
        }
      }
    });
  }

  getLogs() {
    if (this.bleService.ip) {
      try {
        this.getLogByHttp();
      } catch (error) {
        this.bleService.startGetLog();
      }
      
    } else {
      this.bleService.startGetLog();
    }
  }

  loadData(event) {
    if (this.disabled) {
      event.target.disabled = true;
      return;
    }
    this.page++;
    setTimeout(() => {
      // this.bleService.startGetLog();
      this.getLogs();
      event.target.complete();
    }, 500);
  }

  ngOnInit() {
    this.page = 1;
    this.perPage = 10;
  
    this.bleService.logsChanged.subscribe(res => {
      console.log(res);
      this.logList.push(res);
    });
  }

  ngAfterViewInit() {
    this.getLogs();
    // this.bleService.startLogSub();
  }
}
