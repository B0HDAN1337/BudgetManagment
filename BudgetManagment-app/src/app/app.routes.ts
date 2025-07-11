import { Routes } from '@angular/router';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { WalletCreationComponent } from './wallet-creation/wallet-creation.component';
import { authGuard } from './auth.guard';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { WalletMainPageComponent } from './wallet-main-page/wallet-main-page.component';

export const routes: Routes = [
    {path: 'user-log-in', component: UserLogInComponent},
    {path: 'user-sign-up', component: UserSignUpComponent},
    {path: 'account-overview', component: AccountOverviewComponent, canActivate: [authGuard]},
    {path: 'wallet-main-page', component: WalletMainPageComponent},
    {path: 'overview-page', component: OverviewPageComponent, canActivate: [authGuard]},
    {path: 'wallet-creation', component: WalletCreationComponent, canActivate: [authGuard]},
    {path: 'wallet/:id', component: WalletMainPageComponent, canActivate: [authGuard]}
];