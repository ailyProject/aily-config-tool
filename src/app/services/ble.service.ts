import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { CharacteristicList, serviceUUID, llmUUID, wifiUUID, sttUUID, ttsUUID } from '../configs/ble.config';
// const bluetooth = (navigator as any).bluetooth;

@Injectable({
  providedIn: 'root'
})
export class BleService {

  device = {
    name: null,
    deviceId: null,
    service: null,
    characteristic: null,
    value: null
  };

  serviceUUID = serviceUUID
  characteristicList = CharacteristicList

  dataCache = {}

  dataChanged = new Subject()

  constructor(
    // private dataService: DataService
    private platform: Platform
  ) { }

  browserVersionError = false

  async init() {
    await BleClient.initialize();
    // if (!bluetooth) {
    //   console.log('不支持的浏览器');
    // }
  }

  async scan() {
    // PC端 or PWA
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      this.scan_web()
      return
    }
    try {
      await BleClient.requestLEScan(
        {
          // services: [HEART_RATE_SERVICE],
        },
        (result) => {
          console.log('received new scan result', result);
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }

  scan_web() {
    BleClient.requestDevice({
      services: [this.serviceUUID],
    }).then(async device => {
      console.log(device);
      this.device.deviceId = device.name
      this.device.deviceId = device.deviceId
      await BleClient.connect(device.deviceId, (deviceId) => this.onDisconnect(deviceId));
      this.characteristicList.forEach(item => {
        BleClient.read(device.deviceId, this.serviceUUID, item.uuid).then(value => {
          this.dataCache[item.uuid] = new TextDecoder("utf-8").decode(value)
        })
        BleClient.startNotifications(device.deviceId, this.serviceUUID, item.uuid, (value) => {
          console.log('Received value', value)
          this.dataCache[item.uuid] = value
        })
      });
    })
  }

  // https://github.com/capacitor-community/bluetooth-le?tab=readme-ov-file#startnotifications

  // wifiUUID = '123e4567-e89b-12d3-a456-00805f9b34fb';
  getWifiData() {
    // 获取wifi连接信息
    BleClient.read(this.device.deviceId, this.serviceUUID, wifiUUID).then(data => {
      console.log('Received value', data)
      return new TextDecoder("utf-8").decode(data)
    })
  }

  sendWifiData(data: { ssid: string, password: string }) {
    // 发送wifi连接信息

    return this.send(wifiUUID, data)
    // 监听网络连接状态
    // BleClient.startNotifications(this.device.deviceId, this.device.service, this.device.characteristic, (value) => {
    //   console.log('Received value', value)
    // })
  }

  async getModelData() {
    // 获取模型信息
    let llmData = await BleClient.read(this.device.deviceId, this.serviceUUID, llmUUID)
    let sttData = await BleClient.read(this.device.deviceId, this.serviceUUID, sttUUID)
    let ttsData = await BleClient.read(this.device.deviceId, this.serviceUUID, ttsUUID)

    let data = {
      "llm": new TextDecoder("utf-8").decode(llmData),
      "stt": new TextDecoder("utf-8").decode(sttData),
      "tts": new TextDecoder("utf-8").decode(ttsData),
    }

    console.log('Received value', data)
    return data
  }

  sendLLMData(data: { llm_model: string, llm_key: string, llm_preprompt: string, llm_temp: string }) {
    // 发送语言模型信息
    return this.send(llmUUID, data)
  }

  sendSTTData(data: { stt_model: string, stt_key: string }) {
    // 发送语音识别模型信息
    return this.send(sttUUID, data)
  }

  sendTTSData(data: { tts_model: string, tts_key: string, tts_role: string }) {
    // 发送语音合成模型信息
    return this.send(ttsUUID, data)
  }

  sendModelData(data: { llm: any, stt: any, tts: any}) {
    this.sendLLMData(data.llm)
    this.sendSTTData(data.stt)
    this.sendTTSData(data.tts)

    return true;
  }

  send(uuid, value) {
    try {
      // 判断是否已连接设备
      if (!this.device.deviceId) {
        console.log('未连接设备');
        return false;
      }

      // 判断value是否为string，如果不是则转为string
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }

      // 将value转为ArrayBuffer
      value = new TextEncoder().encode(value)

      BleClient.write(this.device.deviceId, this.serviceUUID, uuid, value)
      return true;
    } catch (error) {
      console.log('send error: ', error)
      return false;
    }
  }

  async connect(device) {
    await BleClient.connect(device.deviceId);
    console.log('connected to device', device);
  }

  onDisconnect(deviceId: string): void {
    console.log(`device ${deviceId} disconnected`);
  }

  tempData = '';
  // handleCharacteristicValueChanged(event) {
  //   let value = event.target.value;
  //   let decoder = new TextDecoder();
  //   let decodedValue = decoder.decode(value);
  //   console.log(`Received data: ${decodedValue}`);

  //   this.tempData += decodedValue;

  //   // 检查是否存在'\n'
  //   let lastIndex = this.tempData.lastIndexOf('\n');
  //   if (lastIndex !== -1) {
  //     // 获取最后一个'\n'前的数据并处理
  //     let processData = this.tempData.substring(0, lastIndex);
  //     this.dataService.processData(processData);

  //     // 保留'\n'后的数据
  //     this.tempData = this.tempData.substring(lastIndex + 1);
  //   }

  //   this.dataChanged.next(decodedValue);
  // }

  onDisconnected(event) {
    // console.log(`Device ${this.device.name} is disconnected.`);
    this.device = null;
  }

  disconnect() {
    // if (this.device) {
    //   console.log(`Disconnecting from ${this.device.name}...`);
    //   if (this.device.gatt.connected) {
    //     this.device.gatt.disconnect();
    //     console.log(`Device ${this.device.name} is disconnected.`);
    //   } else {
    //     console.log(`Device ${this.device.name} is already disconnected.`);
    //   }
    //   this.device = null;
    // } else {
    //   console.log('No device is connected.');
    // }
  }

}