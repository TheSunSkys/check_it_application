import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MystudentPage } from './mystudent.page';

describe('MystudentPage', () => {
  let component: MystudentPage;
  let fixture: ComponentFixture<MystudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MystudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MystudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
