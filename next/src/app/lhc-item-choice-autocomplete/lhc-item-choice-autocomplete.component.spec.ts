import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemChoiceAutocompleteComponent } from './lhc-item-choice-autocomplete.component';

describe('LhcItemChoiceAutocompleteComponent', () => {
  let component: LhcItemChoiceAutocompleteComponent;
  let fixture: ComponentFixture<LhcItemChoiceAutocompleteComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ LhcItemChoiceAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemChoiceAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
