import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastatsPage } from './datastats.page';

describe('DatastatsPage', () => {
  let component: DatastatsPage;
  let fixture: ComponentFixture<DatastatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
