import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyclassPage } from './myclass.page';

describe('MyclassPage', () => {
  let component: MyclassPage;
  let fixture: ComponentFixture<MyclassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyclassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
