import { Routes } from '@angular/router';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

export const routes: Routes = [
    {path: 'user-log-in', component: UserLogInComponent},
    {path: 'user-sign-up', component: UserSignUpComponent}
];