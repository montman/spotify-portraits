import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpotifySong } from '../classes/spotify-song.model';
import { CloudService } from '../services/cloud.service';

@Component({
  selector: 'spotify-list',
  template: `
    <div class="d-flex mb-1" >
        <div style="width: 96px;">
        <img
      [src]="element.cover"
      class="img-fluid">
        </div>
        <div class="flex-fill pl-2">
<h5>{{element.title}}    <button class="btn btn-primary float-right btn-sm" (click)="open()">Open</button>
</h5>
<p>{{element.artist}}</p>
<p class="text-secondary">{{element.album}}</p>

<p>{{element.parseDuration()}}</p>
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
