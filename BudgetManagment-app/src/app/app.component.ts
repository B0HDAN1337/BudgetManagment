import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BudgetManagment-app';
  isLoggedIn = false;
  isLoginOrRegisterPage = false;

  constructor(private router: Router, private authService: AuthService) {
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
  

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/user-log-in']);
  }
}
