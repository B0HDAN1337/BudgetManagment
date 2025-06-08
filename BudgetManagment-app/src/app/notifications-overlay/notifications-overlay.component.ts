import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-overlay',
  imports: [CommonModule],
  templateUrl: './notifications-overlay.component.html',
  styleUrl: './notifications-overlay.component.css'
})
export class NotificationsOverlayComponent {

  @Output() close = new EventEmitter<void>();

  closeMenu() {
    this.close.emit();
  }

  isActiveNotificationContentVisible = false;
  isNonActiveNotificationContentVisible = false;

  ShowActiveNotificationContent()
  {
    this.isActiveNotificationContentVisible = true;
  }

  ShowNonActiveNotificationContent()
  {
    this.isNonActiveNotificationContentVisible = true;
  }
  
  HideActiveNotificationContent()
  {
    this.isActiveNotificationContentVisible = false;
  }

  HideNonActiveNotificationContent()
  {
    this.isNonActiveNotificationContentVisible = false;
  }

}
