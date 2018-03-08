import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  @Component({selector: 'app-header', template: ''})
  class HeaderStubComponent {}

  @Component({selector: 'app-main', template: ''})
  class MainStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent,
        MainStubComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render header component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const appElement: HTMLElement = fixture.nativeElement;
    expect(appElement.querySelector('app-header')).not.toBeNull();
  }));

  it('should render main component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const appElement: HTMLElement = fixture.nativeElement;
    expect(appElement.querySelector('app-main')).not.toBeNull();
  }));
});
