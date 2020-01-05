import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmapPage } from './getmap.page';

describe('GetmapPage', () => {
  let component: GetmapPage;
  let fixture: ComponentFixture<GetmapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetmapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
