import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckitPage } from './checkit.page';

describe('CheckitPage', () => {
  let component: CheckitPage;
  let fixture: ComponentFixture<CheckitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
