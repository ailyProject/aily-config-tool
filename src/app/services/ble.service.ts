import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { CharacteristicList, serviceUUID } from '../ble.config';
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
        BleClient.startNotifications(device.deviceId, this.serviceUUID, item.uuid, (value) => {
          console.log('Received value', value)
          this.dataCache[item.uuid] = value
        })
      });
    })
    // .then(server => {
    //   this.server = server;
    //   this.device.addEventListener('gattserverdisconnected', (event) => this.onDisconnected(event));
    //   return server.getPrimaryService(this.serviceUUID);
    // })
    // .then(service => {
    //   console.log(service);

    //   return service.getCharacteristic(this.characteristicUUID);
    // })
    // .then(characteristic => {
    //   // console.log(characteristic);
    //   // this.characteristicInstance = characteristic;
    //   // // console.log(this.characteristicInstance);
    //   // this.characteristicInstance.addEventListener('characteristicvaluechanged', (event) => this.handleCharacteristicValueChanged(event));
    //   // this.characteristicInstance.startNotifications();
    // })
    // .catch(error => {
    //   console.log(error);
    //   // this.device = null
    // });
  }

  // https://github.com/capacitor-community/bluetooth-le?tab=readme-ov-file#startnotifications

  wifiUUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
  sendWifiData(data: { ssid: string, password: string }) {
    // 发送wifi连接信息
    this.send(this.wifiUUID, data)
    // 监听网络连接状态
    // BleClient.startNotifications(this.device.deviceId, this.device.service, this.device.characteristic, (value) => {
    //   console.log('Received value', value)
    // })
  }

  sendModelData(data: { model: string }) {

  }

  send(uuid, value) {
    BleClient.write(this.device.deviceId, this.device.service, this.device.characteristic, value)
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