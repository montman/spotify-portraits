import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotifyComponent } from './pages/spotify.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo:'spotify'
  },
  {
      path:'spotify',
      component:SpotifyComponent,
      data: {title:'Spotify Portrait Generator'}
    }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
