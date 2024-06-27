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
  disabled: boolean = true;
  showNoMore: boolean = false;

  loading: boolean = false;

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
          this.disabled = false;
          this.loading = false;
          this.showNoMore = false;
          this.cd.detectChanges();
        } else {
          this.disabled = true;
          this.showNoMore = true;
        }
      }
    });
  }

  getLogs(load_more) {
    if (this.bleService.ip) {
      this.getLogByHttp();
    } else {
      if (load_more === false) {
        this.bleService.startGetLog();
      } else {
        this.bleService.getMoreLog();
      }
    }
  }

  loadData(event) {
    event.target.disabled = true;
    if (this.disabled) {
      event.target.disabled = true;
      return;
    }
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.page++;
    setTimeout(() => {
      // this.bleService.startGetLog();
      this.getLogs(true);
      event.target.disabled = false;
      event.target.complete();
    }, 500);
  }

  ngOnInit() {
    this.page = 1;
    this.perPage = 10;
  
    this.bleService.logsChanged.subscribe(res => {
      console.log(res);
      if (res === null) {
        if (this.page > 1) {
          this.disabled = true;
          this.showNoMore = true;
        }
      } else {
        this.logList.push(res);
        this.disabled = false;
        this.loading = false;
        this.showNoMore = false;
      }
    });
  }

  ngAfterViewInit() {
    this.getLogs(false);
    // this.bleService.startLogSub();
  }
}
