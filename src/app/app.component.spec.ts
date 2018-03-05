import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map.service';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MapComponent
      ],
      providers: [
        MapService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render map component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const appElement: HTMLElement = fixture.nativeElement;
    expect(appElement.querySelector('app-map')).not.toBeNull();
  }));
});
