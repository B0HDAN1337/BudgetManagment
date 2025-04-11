import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BudgetManagment-app';

  constructor(private router: Router) {}

  btnClickLogin()
  {
     this.router.navigate(['/user-log-in'])
  }

  btnClickSignUp()
  {
    this.router.navigate(['/user-sign-up'])
  }


}

