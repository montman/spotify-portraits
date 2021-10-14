import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpotifySong } from '../classes/spotify-song.model';
import { CloudService } from '../services/cloud.service';

@Component({
  selector: 'spotify-list',
  template: `
    <div class="rowList" nz-row style="padding: 1rem;">
        <div nz-col nzFlex="96px">
        <img
      nz-image
      width="96px"
      height="96px"
      [nzSrc]="element.cover"
      alt="">
        </div>
        <div nz-col nzFlex="auto" style="padding-left: 1rem">
<h5 nz-typography>{{element.title}}    <button (click)="open()" style="float: right;" nz-button nzType="primary" [nzDanger]="element.loaded" nzShape="circle"><i nz-icon [nzType]="element.loaded ? 'close' : 'download'"></i></button>
</h5>
<p nz-typography>{{element.artist}}</p>
<p nz-typography nzType="secondary">{{element.album}}</p>

<p nz-typography>{{element.parseDuration()}}</p>
        </div>
      </div>
      <generate-portrait [accentColor]="accentColor"  *ngIf="element.loaded" [element]="element"></generate-portrait>
  `,
  styles: [`
  .rowList:hover {
    background-color:#eee;
  }
  `
  ]
})
export class SpotifyListComponent implements OnInit {
  @Input() element!:SpotifySong
  @Input() accentColor!:string;
  @Output() openedId:EventEmitter<string> = new EventEmitter<string>()
  open() {
    if (this.element.loaded) this.element.loaded = false;
    else {
      this.element.loaded = true;
      this.openedId.emit(this.element.id)
    } 
  }
  constructor() { }

  ngOnInit(): void {
  }

}
