import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WifiConfigPage } from './wifi-config.page';

describe('WifiConfigPage', () => {
  let component: WifiConfigPage;
  let fixture: ComponentFixture<WifiConfigPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WifiConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
