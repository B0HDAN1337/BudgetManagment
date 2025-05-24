import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OverlayService {
  private supportOverlayVisible = new BehaviorSubject<boolean>(false);
  supportOverlayVisible$ = this.supportOverlayVisible.asObservable();

  showSupport() {
    this.supportOverlayVisible.next(true);
  }

  hideSupport() {
    this.supportOverlayVisible.next(false);
  }
}
