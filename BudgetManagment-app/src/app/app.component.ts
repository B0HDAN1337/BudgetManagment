import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { OverlayService } from './services/overlay.service'; 
import { SupportHelpFormOverlayComponent } from './support-help-form-overlay/support-help-form-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SupportHelpFormOverlayComponent 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BudgetManagment-app';
  isLoggedIn = false;
  isLoginOrRegisterPage = false;
  isSupportVisible = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private overlayService: OverlayService 
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        this.isLoginOrRegisterPage = currentUrl.includes('/user-log-in') || currentUrl.includes('/user-sign-up');
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();

    this.overlayService.supportOverlayVisible$.subscribe((visible: boolean) => {
      this.isSupportVisible = visible;
    });
  }

  btnClickLogin() {
    this.router.navigate(['/user-log-in']);
  }

  btnClickSignUp() {
    this.router.navigate(['/user-sign-up']);
  }

  goToAccountOverview() {
    this.router.navigate(['/account-overview']);
  }

  goToSupportForm() {
    this.overlayService.showSupport(); // ✅ THIS replaces router navigation
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/user-log-in']);
  }
}
