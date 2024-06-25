import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from './response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

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
