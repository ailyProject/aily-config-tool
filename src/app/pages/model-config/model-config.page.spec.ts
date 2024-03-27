import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelConfigPage } from './model-config.page';

describe('ModelConfigPage', () => {
  let component: ModelConfigPage;
  let fixture: ComponentFixture<ModelConfigPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModelConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
