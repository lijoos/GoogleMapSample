import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDirectionPanelComponent } from './map-direction-panel.component';

describe('MapDirectionPanelComponent', () => {
  let component: MapDirectionPanelComponent;
  let fixture: ComponentFixture<MapDirectionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDirectionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDirectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
