import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyloadtestComponent } from './lazyloadtest.component';

describe('LazyloadtestComponent', () => {
  let component: LazyloadtestComponent;
  let fixture: ComponentFixture<LazyloadtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyloadtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyloadtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
