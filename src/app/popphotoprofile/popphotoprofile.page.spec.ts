import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopphotoprofilePage } from './popphotoprofile.page';

describe('PopphotoprofilePage', () => {
  let component: PopphotoprofilePage;
  let fixture: ComponentFixture<PopphotoprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopphotoprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopphotoprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
