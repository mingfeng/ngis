import { TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutService]
    });
  });

  const spy = jasmine.createSpy();
  beforeEach(inject([LayoutService], (service: LayoutService) => {
    service.sidePanelVisibility.subscribe({
      next: value => spy(value)
    });
  }));

  it('should be created', inject([LayoutService], (service: LayoutService) => {
    expect(service).toBeTruthy();
  }));

  it('#sidePanelVisibility BehaviorSubject should have false vallue on start', inject([LayoutService], (service: LayoutService) => {
    expect(service.sidePanelVisibility.getValue()).toBeFalsy();
  }));

  it('#showSidePanel should emit a true value on #sidePanelVisibility', inject([LayoutService], (service: LayoutService) => {
    service.showSidePanel();
    expect(spy).toHaveBeenCalledWith(true);
    expect(service.sidePanelVisibility.getValue()).toBeTruthy();
  }));

  it('#hideSidePanel should emit a false value on #sidePanelVisibility', inject([LayoutService], (service: LayoutService) => {
    service.hideSidePanel();
    expect(spy).toHaveBeenCalledWith(false);
    expect(service.sidePanelVisibility.getValue()).toBeFalsy();
  }));

  it('#detailPanelVisibility BehaviorSubject should have false vallue on start', inject([LayoutService], (service: LayoutService) => {
    expect(service.detailPanelVisibility.getValue()).toBeFalsy();
  }));

  it('#showDetailPanel should emit a true value on #detailPanelVisibility', inject([LayoutService], (service: LayoutService) => {
    service.showDetailPanel();
    expect(spy).toHaveBeenCalledWith(true);
    expect(service.detailPanelVisibility.getValue()).toBeTruthy();
  }));

  it('#hideDetailPanel should emit a false value on #detailPanelVisibility', inject([LayoutService], (service: LayoutService) => {
    service.hideDetailPanel();
    expect(spy).toHaveBeenCalledWith(false);
    expect(service.detailPanelVisibility.getValue()).toBeFalsy();
  }));
});
