import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wifi-config',
  templateUrl: './wifi-config.page.html',
  styleUrls: ['./wifi-config.page.scss'],
})
export class WifiConfigPage implements OnInit {

  ap;
  password;

  constructor() { }

  ngOnInit() {
  }

  connect() {

  }

}
