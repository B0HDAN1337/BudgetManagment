import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OverlayService {

  private supportOverlayVisible = new BehaviorSubject<boolean>(false);
  private notificationsOverlayVisible = new BehaviorSubject<boolean>(false);

  supportOverlayVisible$ = this.supportOverlayVisible.asObservable();
  notificationsOverlayVisible$ = this.notificationsOverlayVisible.asObservable();

  showSupport() {
    this.supportOverlayVisible.next(true);
  }

  hideSupport() {
    this.supportOverlayVisible.next(false);
  }

  showNotifications() {
    this.notificationsOverlayVisible.next(true);
  }

  hideNotifications() {
    this.notificationsOverlayVisible.next(false);
  }
}
