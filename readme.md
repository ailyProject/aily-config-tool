# aily Config Tool  
本程序用于手机、PC配置aily HDK使用。  
![](./img/demo.jpg)

主要功能如下：  
1. 系统基础信息查看
2. 配置WiFi
3. 配置模型
4. 查看对话记录(TODO)

## 适配硬件
· Raspberry Pi zero W/2W  [已集成aily服务的镜像]()  

## 编译
### PC端/pwa编译  
```
ionic build
```
然后将www目录下内容部署到服务器  
注意：必须要要配置ssl证书才能正常使用web ble功能  

### android/ios端编译
```
npm run android/ios
```
然后在android studio/xcode中编译打包  


## aily Config Service  
本程序需配合[aily-config-service](https://github.com/ailyProject/aily-config-service)使用  