import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from './response.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  ip = "";

  constructor(
    private http: HttpClient
  ) { }

  checkIpAccessibility(ip: string) {
    const url = `http://${ip}:8888/api/v1/ping`; // 假设IP地址是HTTP协议
    this.http.get(url).pipe(
      catchError(err => throwError(err))
    ).subscribe(
      res => { this.ip = ip; },
      error => { 
        console.error("IP不可用")
        this.ip = ""; }
    );
  }

  getLogs(host: string, page: number = 1, perPage: number = 10) {
    return this.http.get<ResponseModel>(`http://${host}:8888/api/v1/logs?page=${page}&perPage=${perPage}`)
  }

  getLLMModelOptions(host: string) {
    return this.http.get<ResponseModel>(`http://${host}:8888/api/v1/llmModelOptions`)
  }

  getSTTModelOptions(host: string) {
    return this.http.get<ResponseModel>(`http://${host}:8888/api/v1/sttModelOptions`)
  }

  getTTSModelOptions(host: string) {
    return this.http.get<ResponseModel>(`http://${host}:8888/api/v1/ttsModelOptions`)
  }

  getModelData(host: string) {
    return this.http.get<ResponseModel>(`http://${host}:8888/api/v1/modelData`)
  }

  updateModelData(host: string, data: any) {
    return this.http.post<ResponseModel>(`http://${host}:8888/api/v1/modelData`, data)
  }
}
