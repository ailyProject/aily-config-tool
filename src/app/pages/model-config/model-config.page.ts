import { Component, OnInit } from '@angular/core';
import { modelList } from 'src/app/model.config';

@Component({
  selector: 'app-model-config',
  templateUrl: './model-config.page.html',
  styleUrls: ['./model-config.page.scss'],
})
export class ModelConfigPage implements OnInit {

  modelList = modelList

  constructor() { }

  ngOnInit() {
  }

  save() {

  }

}
