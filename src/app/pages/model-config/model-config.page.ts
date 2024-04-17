import { Component, OnInit } from '@angular/core';
import { modelList } from 'src/app/model.config';
import { BleService } from 'src/app/services/ble.service';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-model-config',
  templateUrl: './model-config.page.html',
  styleUrls: ['./model-config.page.scss'],
})
export class ModelConfigPage implements OnInit {

  modelList = modelList

  llmData = {
    llm_model: '',
    llm_key: '',
    llm_preprompt: '',
    llm_temp: ''
  }

  ttsData = {
    tts_model: '',
    tts_key: '',
    tts_role: ''
  }

  sttData = {
    stt_model: '',
    stt_key: '',
  }

  constructor(
    private bleService: BleService,
    private noticeService: NoticeService
  ) { }

  ngOnInit() {
    console.log('model config init')
    this.bleService.getModelData().then((modelData) => {
      console.log(modelData);
      if (modelData) {
        this.llmData = JSON.parse(modelData.llm);
        this.sttData = JSON.parse(modelData.stt);
        this.ttsData = JSON.parse(modelData.tts);
      }
    });
  }

  set_llm_model(e) {
    this.llmData.llm_model = e.detail.value;
  }

  set_stt_model(e) {
    this.sttData.stt_model = e.detail.value;
  }

  set_tts_model(e) {
    this.ttsData.tts_model = e.detail.value;
  }

  save() {
    let modelData = {
      llm: this.llmData,
      stt: this.sttData,
      tts: this.ttsData
    }
    if (this.bleService.sendModelData(modelData)) {
      this.noticeService.showToast('success');
    } else {
      this.noticeService.showToast('error');
    }
  }

}
