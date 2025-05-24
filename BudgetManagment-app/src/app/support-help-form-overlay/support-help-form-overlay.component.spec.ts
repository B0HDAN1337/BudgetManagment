import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportHelpFormOverlayComponent } from './support-help-form-overlay.component';

describe('SupportHelpFormOverlayComponent', () => {
  let component: SupportHelpFormOverlayComponent;
  let fixture: ComponentFixture<SupportHelpFormOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportHelpFormOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportHelpFormOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
