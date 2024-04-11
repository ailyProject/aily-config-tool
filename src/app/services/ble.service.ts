import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { BleClient } from '@capacitor-community/bluetooth-le';
// const bluetooth = (navigator as any).bluetooth;

@Injectable({
  providedIn: 'root'
})
export class BleService {

  device = null;
  server = null;
  characteristicInstance = null;

  serviceUUID = '0000ffe0-0000-1000-8000-00805f9b34fb'
  characteristicUUID = '0000ffe1-0000-1000-8000-00805f9b34fb'

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
      // acceptAllDevices: true,
      // optionalServices: [this.serviceUUID],
      // filters: [{ services: [this.serviceUUID] }]
    }).then(device => {
      this.device = device;
      console.log(this.device);
      // console.log(this.device.name);
      return device;
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

  sendData(data) {
    if (!this.characteristicInstance) {
      console.log('No characteristic to write to!');
      return;
    }
    let encoder = new TextEncoder();
    this.characteristicInstance.writeValue(encoder.encode(data))
      .then(() => {
        // console.log(`Data sent: ${data}`);
      })
      .catch(error => {
        // console.log(`Send error: ${error}`);
      });
  }

  async connect(device) {
    await BleClient.connect(device.deviceId);
    console.log('connected to device', device);
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
    console.log(`Device ${this.device.name} is disconnected.`);
    this.device = null;
  }

  disconnect() {
    if (this.device) {
      console.log(`Disconnecting from ${this.device.name}...`);
      if (this.device.gatt.connected) {
        this.device.gatt.disconnect();
        console.log(`Device ${this.device.name} is disconnected.`);
      } else {
        console.log(`Device ${this.device.name} is already disconnected.`);
      }
      this.device = null;
    } else {
      console.log('No device is connected.');
    }
  }

}