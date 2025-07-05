import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { InfoComponent } from './features/info/info.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent  },
    { path: 'profile', component: ProfileComponent  },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'info', component: InfoComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'homw' }
];
