import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { modelList } from 'src/app/model.config';
import { BleService } from 'src/app/services/ble.service';
import { NoticeService } from 'src/app/services/notice.service';
import { HttpService } from 'src/app/services/http.service';
import { llmModelOptionsUUID, sttModelOptionsUUID, ttsModelOptionsUUID } from 'src/app/configs/ble.config';

@Component({
  selector: 'app-model-config',
  templateUrl: './model-config.page.html',
  styleUrls: ['./model-config.page.scss'],
})
export class ModelConfigPage implements OnInit {

  // get llmModelOptions() {
  //   return this.bleService.dataCache[llmModelOptionsUUID];
  // }

  // get sttModelOptions() {
  //   return this.bleService.dataCache[sttModelOptionsUUID];
  // }

  // get ttsModelOptions() {
  //   return this.bleService.dataCache[ttsModelOptionsUUID];
  // }

  llmModelOptions: any = []
  sttModelOptions: any = []
  ttsModelOptions: any = []

  modelConfData: any =
    {
      "llmURL": "",
      "llmModel": "",
      "llmKey": "",
      "llmPrePrompt": "",
      "llmTemp": "",
      "sttURL": "",
      "sttModel": "",
      "sttKey": "",
      "ttsURL": "",
      "ttsModel": "",
      "ttsKey": "",
      "ttsRole": ""
    }


  constructor(
    private bleService: BleService,
    private noticeService: NoticeService,
    private httpService: HttpService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getLLMModelOptions();
    this.getSTTModelOptions();
    this.getTTSModelOptions();
    this.getModelData();

    // this.bleService.getModelData().then((modelData) => {
    //   this.modelConfData = modelData;
    //   console.log("modelConfData: ", this.modelConfData);
    // });
    this.bleService.llmModelOptionsSub.subscribe((data) => {
      this.llmModelOptions.push(data);
    });
    this.bleService.ttsModelOptionsSub.subscribe((data) => {
      this.ttsModelOptions.push(data);
    });
    this.bleService.sttModelOptionsSub.subscribe((data) => {
      this.sttModelOptions.push(data);
    });
    this.bleService.modelDataSub.subscribe((data) => {
      this.modelConfData = data;
    });
    this.bleService.updateRes.subscribe((data) => {
      if (data["type"] === 'aily') {
        this.noticeService.hideLoading();
        if (data["status"] === 1) {
          this.noticeService.showToast('Model setting success');
        } else {
          this.noticeService.showToast('Model setting failed');
        }
      }
    })
  }

  getLLMModelOptions() {
    if (this.bleService.ip) {
      try {
        this.httpService.getLLMModelOptions(this.bleService.ip).subscribe(res => {
          if (res.status === 200) {
            this.llmModelOptions = res.data;
            this.cd.detectChanges();
          } else {
            console.log("getLLMModelOptions failed");
          }
        });
      } catch {
        this.bleService.startGetLLMModelOptions();
      }
    } else {
      this.bleService.startGetLLMModelOptions();
    }
  }

  getSTTModelOptions() {
    if (this.bleService.ip) {
      this.httpService.getSTTModelOptions(this.bleService.ip).subscribe(res => {
        if (res.status === 200) {
          this.sttModelOptions = res.data;
          this.cd.detectChanges();
        } else {
          console.log("getSTTModelOptions failed");
        }
      });
    } else {
      this.bleService.startGetSTTModelOptions();
    }
  }

  getTTSModelOptions() {
    if (this.bleService.ip) {
      this.httpService.getTTSModelOptions(this.bleService.ip).subscribe(res => {
        if (res.status === 200) {
          this.ttsModelOptions = res.data;
          this.cd.detectChanges();
        } else {
          console.log("getTTSModelOptions failed");
        }
      });
    } else {
      this.bleService.startGetTTSModelOptions();
    }
  }

  getModelData() {
    if (this.bleService.ip) {
      this.httpService.getModelData(this.bleService.ip).subscribe(res => {
        if (res.status === 200) {
          this.modelConfData = res.data;
          this.cd.detectChanges();
        } else {
          console.log("getModelData failed");
        }
      });
    } else {
      this.bleService.getModelData();
    }
  }

  set_llm_model(e) {
    let data = e.detail.value;
    if (data) {
      let dataArr = data.split("||")
      this.modelConfData.llmModel = dataArr[0];
      this.modelConfData.llmURL = dataArr[1];
    }
  }

  set_stt_model(e) {
    let data = e.detail.value;
    if (data) {
      let dataArr = data.split("||")
      this.modelConfData.sttModel = dataArr[0];
      this.modelConfData.sttURL = dataArr[1];
    }
  }

  set_tts_model(e) {
    console.log("set_tts_model: ", e)
    let data = e.detail.value;
    if (data) {
      let dataArr = data.split("||")
      this.modelConfData.ttsModel = dataArr[0];
      this.modelConfData.ttsURL = dataArr[1];
    }
  }

  save() {
    this.noticeService.showLoading("Saving...");

    if (this.bleService.ip) {
      try {
        this.httpService.updateModelData(this.bleService.ip, this.modelConfData).subscribe(res => {
          if (res.status === 200) {
            this.noticeService.hideLoading();
            this.noticeService.showToast('Model setting success');
          } else {
            this.noticeService.hideLoading();
            this.noticeService.showToast('Model setting failed');
          }
        });
      } catch {
        this.bleService.sendModelData(this.modelConfData)
      }
    } else {
      this.bleService.sendModelData(this.modelConfData)
    }
  }

}
