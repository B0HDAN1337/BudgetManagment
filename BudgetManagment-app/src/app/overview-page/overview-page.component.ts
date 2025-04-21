import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-overview-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent {

  isMenuVisible = false;

  OpenMenu()
  {
    this.isMenuVisible = true;
  }

  CloseMenu()
  {
    this.isMenuVisible = false;
  }
}
