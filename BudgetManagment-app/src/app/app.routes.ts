import { Routes } from '@angular/router';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { WalletCreationComponent } from './wallet-creation/wallet-creation.component';

export const routes: Routes = [
    {path: 'user-log-in', component: UserLogInComponent},
    {path: 'user-sign-up', component: UserSignUpComponent},
    {path: 'overview-page', component: OverviewPageComponent},
    {path: 'wallet-creation', component: WalletCreationComponent}
];