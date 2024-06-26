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

  llmURL: string = "";
  llmModel: string = "";
  llmKey: string = "";
  llmPrePrompt: string = "";
  llmTemp: string = "";
  sttURL: string = "";
  sttModel: string = "";
  sttKey: string = "";
  ttsURL: string = "";
  ttsModel: string = "";
  ttsKey: string = "";
  ttsRole: string = "";

  // modelConfData: any =
  //   {
  //     "llmURL": "",
  //     "llmModel": "",
  //     "llmKey": "",
  //     "llmPrePrompt": "",
  //     "llmTemp": "",
  //     "sttURL": "",
  //     "sttModel": "",
  //     "sttKey": "",
  //     "ttsURL": "",
  //     "ttsModel": "",
  //     "ttsKey": "",
  //     "ttsRole": ""
  //   }


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
    this.bleService.modelDataSub.subscribe((data: any) => {
      // 将data的值赋给modelConfData
      // this.modelConfData = {...this.modelConfData, ...data};
      let key = data.name;
      if (key === "llmKey") {
        this.llmKey = data.value;
      } else if (key === "llmModel") {
        this.llmModel = data.value;
      } else if (key === "llmPrePrompt") {
        this.llmPrePrompt = data.value;
      } else if (key === "llmTemp") {
        this.llmTemp = data.value;
      } else if (key === "llmURL") {
        this.llmURL = data.value;
      } else if (key === "sttKey") {
        this.sttKey = data.value;
      } else if (key === "sttModel") {
        this.sttModel = data.value;
      } else if (key === "sttURL") {
        this.sttURL = data.value;
      } else if (key === "ttsKey") {
        this.ttsKey = data.value;
      } else if (key === "ttsModel") {
        this.ttsModel = data.value;
      } else if (key === "ttsRole") {
        this.ttsRole = data.value;
      }
      this.cd.detectChanges();
      // console.log("modelConfData: ", this.modelConfData)
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

  ngAfterViewInit() {
    this.getModelData();
  }

  getLLMModelOptions() {
    console.log("start getLLMModelOptions")
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
    console.log("start getSTTModelOptions")
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
    console.log("start getTTSModelOptions")
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
          // this.modelConfData = res.data;
          if (res.data) {
            let data = res.data;
            this.llmKey = data.llmKey;
            this.llmModel = data.llmModel;
            this.llmPrePrompt = data.llmPrePrompt;
            this.llmTemp = data.llmTemp;
            this.llmURL = data.llmURL;
            this.sttKey = data.sttKey;
            this.sttModel = data.sttModel;
            this.sttURL = data.sttURL;
            this.ttsKey = data.ttsKey;
            this.ttsModel = data.ttsModel;
            this.ttsRole = data.ttsRole;
          }
          this.cd.detectChanges();
        } else {
          console.log("getModelData failed");
        }
      });
    } else {
      console.log("Get model data from ble")
      this.bleService.getModelData();
    }
  }

  set_llm_model(e) {
    let data = e.detail.value;
    if (data) {
      let dataArr = data.split("||")
      this.llmModel = dataArr[0];
      this.llmURL = dataArr[1];
      // this.modelConfData.llmModel = dataArr[0];
      // this.modelConfData.llmURL = dataArr[1];
    }
  }

  set_stt_model(e) {
    let data = e.detail.value;
    if (data) {
      let dataArr = data.split("||")
      this.sttModel = dataArr[0];
      this.sttURL = dataArr[1];
      // this.modelConfData.sttModel = dataArr[0];
      // this.modelConfData.sttURL = dataArr[1];
    }
  }

  set_tts_model(e) {
    console.log("set_tts_model: ", e)
    let data = e.detail.value;
    if (data) {
      let dataArr = data.split("||")
      // this.modelConfData.ttsModel = dataArr[0];
      // this.modelConfData.ttsURL = dataArr[1];
      this.ttsModel = dataArr[0];
      this.ttsURL = dataArr[1];
    }
  }

  save() {
    this.noticeService.showLoading("Saving...");

    let modelConfData = {
      llmKey: this.llmKey,
      llmModel: this.llmModel,
      llmPrePrompt: this.llmPrePrompt,
      llmTemp: this.llmTemp,
      llmURL: this.llmURL,
      sttKey: this.sttKey,
      sttModel: this.sttModel,
      sttURL: this.sttURL,
      ttsKey: this.ttsKey,
      ttsModel: this.ttsModel,
      ttsRole: this.ttsRole,
    }

    if (this.bleService.ip) {
      try {
        this.httpService.updateModelData(this.bleService.ip, modelConfData).subscribe(res => {
          if (res.status === 200) {
            this.noticeService.hideLoading();
            this.noticeService.showToast('Model setting success');
          } else {
            this.noticeService.hideLoading();
            this.noticeService.showToast('Model setting failed');
          }
        });
      } catch {
        this.bleService.sendModelData(modelConfData)
      }
    } else {
      this.bleService.sendModelData(modelConfData)
    }
  }

}
