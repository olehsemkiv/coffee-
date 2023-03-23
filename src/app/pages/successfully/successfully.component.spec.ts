import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullyComponent } from './successfully.component';

describe('SuccessfullyComponent', () => {
  let component: SuccessfullyComponent;
  let fixture: ComponentFixture<SuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
