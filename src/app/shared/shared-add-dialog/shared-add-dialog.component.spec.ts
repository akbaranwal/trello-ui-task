import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAddDialogComponent } from './shared-add-dialog.component';

describe('SharedAddDialogComponent', () => {
  let component: SharedAddDialogComponent;
  let fixture: ComponentFixture<SharedAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
