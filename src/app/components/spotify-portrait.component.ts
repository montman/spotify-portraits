import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { faHeartCircle } from '@fortawesome/pro-duotone-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { SpotifySong } from '../classes/spotify-song.model';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { faCircle, faPauseCircle, faPlayCircle, faPrint, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { average,prominent } from 'color.js'

@Component({
  selector: 'generate-portrait',
  template: `
  <div class="print-area position-relative p-4" [ngStyle]="{'background':enableBg ? backgroundString : 'rgba(0,0,0,0)','color':accentColor}">
    <div class="row mb-2 mt-4 justify-content-center">
      <div class="col-7">
        <img [src]="element.cover" #image (load)="changeBgSettings(image)" class="img-fluid">
      </div>
    </div>
    <div class="row mt-4 mb-2">
      <div class="col">
        <h2 class="spotify-semibold mb-0">{{element.title}}<fa-icon class="text-danger float-right" [icon]="faHeart"></fa-icon></h2>
        <h4 class="spotify">{{element.artist}}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="w-100 position-relative">
        <div class="position-absolute d-flex w-100 h-100 align-items-center justify-content-center">
        <fa-icon [ngStyle]="{'color':accentColor}" [icon]="circle"></fa-icon>
       </div> 
        <div class="position-absolute d-flex w-100 h-100 align-items-center">
        <div class="d-flex w-100" style="height: 5px;">
          <div style="border-radius: 2rem;" [ngStyle]="{'width':factor+'%','background-color':accentColor}">

          </div>
          <div class="flex-fill"  style="border-radius: 2rem; opacity:0.2" [ngStyle]="{'background-color':accentColor}"></div>
        </div>
       </div> 
        
        </div>
      
      </div>

    </div>
    <div class="d-flex mt-2 justify-content-between">
      <span class="spotify">{{element.parseMoment(100/factor)}}</span>
      <span class="spotify">{{element.parseDuration()}}</span>
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <fa-icon class="h1 mr-4" [icon]="back"></fa-icon>
      <fa-icon class="mx-4 display-1" [icon]="play"></fa-icon>
      <fa-icon class="h1 ml-4" [icon]="forward"></fa-icon>
    </div>
    <div class="row mt-2 mb-4 justify-content-center">
      <div class="col text-center">
        <img [src]="codeSrc()" class="rounded-xl img-fluid">
      </div>
    </div>
  </div>
  <div class="row avoidPrint my-2">
    <div class="col-6"><button class="btn btn-sm btn-block btn-success" (click)="print()">Print/Export <fa-icon [icon]="printer"></fa-icon></button></div>
    <div class="col-6 d-flex align-items-center justify-content-center"><div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="bgswitch" [(ngModel)]="enableBg">
  <label class="custom-control-label" for="bgswitch">Enable Background</label>
</div></div>
  </div>
  `,
  styles: [`
  .rounded-xl {
    border-radius:1.3rem!important
  }
  .slider {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;  
  background-color: rgba(0,0,0,0);
  outline: none;
  opacity: 1;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%; 
  background-color: var(--primary-color-spotify);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--primary-color-spotify);
  cursor: pointer;
}
@media print {
  .avoidPrint {
    visibility: hidden;
    display:none
  }
}

  `
  ]
})
export class SpotifyPortrait implements AfterViewInit {
  @Input() element!:SpotifySong
  @Input() accentColor!:string;
  factor:number = 50
  faHeart = faHeart
  circle = faCircle
  backgroundString:string= ''
  back = faStepBackward
  forward = faStepForward
  play = faPauseCircle
  printer = faPrint
  enableBg:boolean = true;
  changeBgSettings(img:HTMLImageElement) {
    prominent(img,{amount:2,format:'hex'}).then(color => {this.backgroundString = `linear-gradient(180deg, ${color[0]} 0%, ${color[1]} 100%)`})
  }
  print() {
    window.print();
  }
  codeSrc() {
    return this.element.code(this.accentColor);
  }
  constructor() { }

  ngAfterViewInit(): void {
  }

}
