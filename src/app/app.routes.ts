import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { InfoComponent } from './features/info/info.component';
import { ScanQRComponent } from './features/scan-qr/scan-qr.component';
import { AuthGuard } from './core/services/auth.guard';

export const routes: Routes = [
    { path: 'login', component: ScanQRComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
    { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
