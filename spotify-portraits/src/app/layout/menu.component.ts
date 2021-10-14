import { Component, OnInit } from '@angular/core';
import { faSpotify,faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-menu',
  template: `
     <ul nz-menu nzTheme="dark" nzMode="inline">
      <li style="margin-top: 0!important;" nz-menu-item *ngFor="let voice of menu" [routerLink]="voice.link" nzMatchRouter>
        <fa-icon [fixedWidth]="true" [icon]="voice.icon"></fa-icon> <span>{{voice.name}}</span>
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class MenuComponent implements OnInit {
  menu:any = [
    {name:'Spotify',icon:faSpotify,link:'spotify'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
