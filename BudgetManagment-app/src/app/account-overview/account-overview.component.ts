import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-overview',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent {
  isMenuVisible = false;

  OpenMenu() {
    this.isMenuVisible = true;
  }

  CloseMenu() {
    this.isMenuVisible = false;
  }
}
