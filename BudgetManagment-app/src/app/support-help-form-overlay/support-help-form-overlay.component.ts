import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support-help-form-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-help-form-overlay.component.html',
  styleUrls: ['./support-help-form-overlay.component.css']
})
export class SupportHelpFormOverlayComponent {
  @Output() close = new EventEmitter<void>();

  closeMenu() {
    this.close.emit();
  }
}
