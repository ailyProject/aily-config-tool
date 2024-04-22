import { Component, OnInit } from '@angular/core';
import { modelList } from 'src/app/model.config';
import { BleService } from 'src/app/services/ble.service';
import { NoticeService } from 'src/app/services/notice.service';
import { llmModelOptionsUUID, sttModelOptionsUUID, ttsModelOptionsUUID } from 'src/app/configs/ble.config';

@Component({
  selector: 'app-model-config',
  templateUrl: './model-config.page.html',
  styleUrls: ['./model-config.page.scss'],
})
export class ModelConfigPage implements OnInit {

  get llmModelOptions() {
    return this.bleService.dataCache[llmModelOptionsUUID];
  }

  get sttModelOptions() {
    return this.bleService.dataCache[sttModelOptionsUUID];
  }

  get ttsModelOptions() {
    return this.bleService.dataCache[ttsModelOptionsUUID];
  }

  modelConfData: any =
    {
      "llmModel": "",
      "llmKey": "",
      "llmPrePrompt": "",
      "llmTemp": "",
      "sttModel": "",
      "sttKey": "",
      "ttsModel": "",
      "ttsKey": "",
      "ttsRole": ""
    }


  constructor(
    private bleService: BleService,
    private noticeService: NoticeService
  ) { }

  ngOnInit() {
    console.log('model config init')
    this.bleService.getModelData().then((modelData) => {
      this.modelConfData = modelData;
      console.log("modelConfData: ", this.modelConfData);
    });
  }

  set_llm_model(e) {
    this.modelConfData.llmModel.value = e.detail.value;
  }

  set_stt_model(e) {
    this.modelConfData.sttModel.value = e.detail.value;
  }

  set_tts_model(e) {
    this.modelConfData.ttsModel.value = e.detail.value;
  }

  save() {
    if (this.bleService.sendModelData(this.modelConfData)) {
      this.noticeService.showToast('success');
    } else {
      this.noticeService.showToast('error');
    }
  }

}
