import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcUnitComponent } from './lhc-unit.component';

describe('LhcUnitComponent', () => {
  let component: LhcUnitComponent;
  let fixture: ComponentFixture<LhcUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
