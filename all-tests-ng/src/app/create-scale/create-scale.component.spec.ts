import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScaleComponent } from './create-scale.component';

describe('CreateScaleComponent', () => {
  let component: CreateScaleComponent;
  let fixture: ComponentFixture<CreateScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
