import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { BleClient } from '@capacitor-community/bluetooth-le';
import {
  CharacteristicList,
  ChrModelConfList,
  ChrModelOptionsList,
  serviceUUID,
  wifiUUID,
  ailyUUID,
  ailyLogUUID,
  llmModelOptionsUUID,
  sttModelOptionsUUID,
  ttsModelOptionsUUID,
  ailyStatusUUID,
} from '../configs/ble.config';
// const bluetooth = (navigator as any).bluetooth;

@Injectable({
  providedIn: 'root'
})
export class BleService {

  wifiSetSuccess = new Subject();
  ailyStatus = new Subject();

  ailyLogs: any = [];

  device = {
    name: null,
    deviceId: null,
    service: null,
    characteristic: null,
    value: null
  };

  deviceList = [];

  serviceUUID = serviceUUID
  characteristicList = CharacteristicList
  chrModelOptionsList = ChrModelOptionsList
  chrModelConfList = ChrModelConfList

  dataCache = {}

  dataChanged = new Subject()

  constructor(
    // private dataService: DataService
    private platform: Platform
  ) { }

  browserVersionError = false

  async init() {
    console.log("ble init");
    try {
      await BleClient.initialize();
    } catch (e) {
      console.log("error: ", e)
    }
  }

  async scan() {
    // PC端 or PWA
    try {
      console.log('start scanning');
      await BleClient.requestLEScan(
        {
          services: [this.serviceUUID],
        },
        (result) => {
          this.deviceList.push(result);
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
      }, 9000);
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
          // console.log(item.uuid, '->Received value', new TextDecoder("utf-8").decode(value))
          this.dataCache[item.uuid] = new TextDecoder("utf-8").decode(value)
          if (item.uuid === "123e4567-e89b-12d3-a456-426614174004") {
            this.wifiSetSuccess.next("success")
          }
        })
      });

      this.getLLMModelOptions();
      this.getSTTModelOptions();
      this.getTTSModelOptions();
      this.getAilyStatus();
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

    this.send(wifiUUID, data)
    // 监听网络连接状态
    // BleClient.startNotifications(this.device.deviceId, this.device.service, this.device.characteristic, (value) => {
    //   console.log('Received value', value)
    // })
  }

  
  llmModelOptions = [];
  sttModelOptions = [];
  ttsModelOptions = [];

  splitData(data, splitStr=":") {
    let dataArr = data.split(splitStr)
    return [dataArr[0], dataArr[1]]
  }

  async getLLMModelOptions() {
    BleClient.startNotifications(this.device.deviceId, this.serviceUUID, llmModelOptionsUUID, (value) => {
      try {
        let data = new TextDecoder("utf-8").decode(value)
        console.log('Received value', data)
        if (data !== '\n') {
          if (data !== '[]') {
            let [name, value] = this.splitData(data)
            this.llmModelOptions.push({"name": name, "value": value})
          }
        } else {
          BleClient.stopNotifications(this.device.deviceId, this.serviceUUID, llmModelOptionsUUID)
          console.log('llmModelOptions: ', this.llmModelOptions)
          this.dataCache[llmModelOptionsUUID] = this.llmModelOptions
        }
      } catch(e) {
        console.error('getLLMModelOptions error: ', e)
      }
    })
  }

  async getSTTModelOptions() {
    BleClient.startNotifications(this.device.deviceId, this.serviceUUID, sttModelOptionsUUID, (value) => {
      try {
        let data = new TextDecoder("utf-8").decode(value)
        console.log('Received value', data)
        if (data !== '\n') {
          if (data !== '[]') {
            let [name, value] = this.splitData(data)
            this.sttModelOptions.push({"name": name, "value": value})
          }
        } else {
          BleClient.stopNotifications(this.device.deviceId, this.serviceUUID, sttModelOptionsUUID)
          console.log('sttModelOptions: ', this.sttModelOptions)
          this.dataCache[sttModelOptionsUUID] = this.sttModelOptions
        }
      } catch(e) {
        console.error('getSTTModelOptions error: ', e)
      }
    })
  }

  async getTTSModelOptions() {
    BleClient.startNotifications(this.device.deviceId, this.serviceUUID, ttsModelOptionsUUID, (value) => {
      try {
        let data = new TextDecoder("utf-8").decode(value)
        console.log('Received value', data)
        if (data !== '\n') {
          if (data !== '[]') {
            let [name, value] = this.splitData(data)
            this.ttsModelOptions.push({"name": name, "value": value})
          }
        } else {
          BleClient.stopNotifications(this.device.deviceId, this.serviceUUID, ttsModelOptionsUUID)
          console.log('ttsModelOptions: ', this.ttsModelOptions)
          this.dataCache[ttsModelOptionsUUID] = this.ttsModelOptions
        }
      } catch(e) {
        console.error('getTTSModelOptions error: ', e)
      }
    })
  }

  async getAilyStatus() {
    BleClient.startNotifications(this.device.deviceId, this.serviceUUID, ailyStatusUUID, (value) => {
      try {
        let data = new TextDecoder("utf-8").decode(value)
        console.log('Aily status Received value: ', data)
        this.ailyStatus.next(data)
      } catch(e) {
        console.error('getAilyStatus error: ', e)
      }
    })
  }

  // async getModelOptions() {
  //   this.chrModelOptionsList.forEach(item => {
  //     BleClient.startNotifications(this.device.deviceId, this.serviceUUID, item.uuid, (value) => {
  //       try {
  //         let data = new TextDecoder("utf-8").decode(value)
  //         console.log('Received value', data)
  //         if (item.name === 'llmModelOptions') {
  //           if (data !== '\n') {
  //             if (data !== '[]') {
  //               let [name, value] = this.splitData(data)
  //               this.llmModelOptions.push({"name": name, "value": value})
  //             }
  //           } else {
  //             BleClient.stopNotifications(this.device.deviceId, this.serviceUUID, item.uuid)
  //             console.log('llmModelOptions: ', this.llmModelOptions)
  //             this.dataCache[item.uuid] = this.llmModelOptions
  //           }
  //         } else if (item.name === 'sttModelOptions') {
  //           if (data !== '\n') {
  //             if (data !== '[]') {
  //               let [name, value] = this.splitData(data)
  //               this.sttModelOptions.push({"name": name, "value": value})
  //             }
  //           } else {
  //             BleClient.stopNotifications(this.device.deviceId, this.serviceUUID, item.uuid)
  //             console.log('sttModelOptions: ', this.sttModelOptions)
  //             this.dataCache[item.uuid] = this.sttModelOptions
  //           }
  //         } else if (item.name === 'ttsModelOptions') {
  //           if (data !== '\n') {
  //             if (data !== '[]') {
  //               let [name, value] = this.splitData(data)
  //               this.ttsModelOptions.push({"name": name, "value": value})
  //             }
  //           } else {
  //             BleClient.stopNotifications(this.device.deviceId, this.serviceUUID, item.uuid)
  //             console.log('ttsModelOptions: ', this.ttsModelOptions)
  //             this.dataCache[item.uuid] = this.ttsModelOptions
  //           }
  //         }
          
  //         // console.log('llmModelOptions: ', this.llmModelOptions)
  //         // if (this.llmModelOptions.endsWith('\n')) {
  //         //   console.log('stopNotifications, data: ', this.llmModelOptions)
  //         // }
          
  //         // console.log('MO Received value: ', data)
  //         // if (data !== '\n') {
  //         //   let item_data = data.split(':')
  //         //   console.log('item_data: ', item_data)
  //         //   this.tempModelOptions[item.uuid].push({"name": item_data[0].toString(), "value": item_data[1].toString()})
  //         // } else {
  //         //   console.log('stopNotifications, data: ', this.tempModelOptions[item.uuid])
  //         //   BleClient.stopNotifications(this.device.deviceId, this.serviceUUID, item.uuid)
  //         // }
  //       } catch(e) {
  //         console.error('getModelOptions error: ', e)
  //       }
  //     })
  //   })
  // }

  async getModelData() {
    let data: any = {};
    // 获取模型信息
    this.chrModelConfList.forEach(item => {
      BleClient.read(this.device.deviceId, this.serviceUUID, item.uuid).then(value => {
        let res = new TextDecoder("utf-8").decode(value)
        this.dataCache[item.uuid] = res
        data[item.name] = res
      })
    })

    console.log('Received value', data)
    return data
  }

  sendModelData(data) {
    this.chrModelConfList.forEach(item => {
      this.send(item.uuid, data[item.name])
    })

    this.send(ailyUUID, "reload")
    return true
  }

  send(uuid, value): void {
    try {
      // 判断是否已连接设备
      if (!this.device.deviceId) {
        console.log('未连接设备');
        return;
      }

      // 判断value是否为string，如果不是则转为string
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }

      // 将value转为ArrayBuffer
      value = new TextEncoder().encode(value)

      BleClient.write(this.device.deviceId, this.serviceUUID, uuid, value).then(() => {
        console.log('send success')
      })
    } catch (error) {
      console.log('send error: ', error)
    }
  }

  tempLogData = '';

  startLogSub(): void {
    BleClient.startNotifications(this.device.deviceId, this.serviceUUID, ailyLogUUID, (value) => {
      // console.log('LogSub Received value: ', new TextDecoder("utf-8").decode(value))
      let data = new TextDecoder("utf-8").decode(value)
      this.tempLogData += data;
      if (this.tempLogData.endsWith('\n')) {
        this.tempLogData = this.tempLogData.substring(0, this.tempLogData.length - 1)
        // 按":"分割数据
        let data = this.tempLogData.split(':')
        this.ailyLogs.push({
          "role": data[0],
          "msg": data[1]
        })
        this.tempLogData = ''
      }
    })
  }


  stopLogSub(): void {
    BleClient.stopNotifications(this.device.deviceId, this.serviceUUID, ailyLogUUID)
  }


  async connect(device) {
    await BleClient.connect(device.deviceId);
    console.log('connected to device', device);
  }

  onConnect(deviceId: string): void {
    console.log(`device ${deviceId} connected`);
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