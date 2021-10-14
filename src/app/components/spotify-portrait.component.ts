import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SpotifySong } from '../classes/spotify-song.model';

@Component({
  selector: 'generate-portrait',
  template: `
  <div nz-row nzJustify="space-around" style="position: relative;border:2px solid gray;" id="toPrint">
  <div class="bg-image" [ngStyle]="{'background-image':'url('+element.cover+')'}">

  </div>
        <div nz-col nzSm="24" nzMd="20" nzLg="16" nzXl="12" style="padding: 2rem; z-index:2">
        <h5 nz-row nz-typography class=" spotify-semibold" nzJustify="space-between" style="margin-bottom: 2rem!important" [ngStyle]="{'color':accentColor}">
          <i nz-icon nzType="down" nzTheme="outline"></i>
          {{element.album}}
          <i nz-icon nzType="more" nzTheme="outline"></i></h5>
          <img [src]="element.cover" style="margin-bottom: 1rem;">
          <h3 nz-typography class="spotify-semibold" [ngStyle]="{'color':accentColor}"><span nz-typography nzType="success" style="float: right;"><i nz-icon nzType="heart" nzTheme="fill"></i></span>{{element.title}}</h3>
          <h5 nz-typography class="spotify" [ngStyle]="{'color':accentColor}">{{element.artist}}</h5>
          <div nz-row nzJustify="space-around"  style="position: relative;margin-top:2rem">
          <div nz-row nzAlign="middle" style="position:absolute;width:100%;height:100%">
            <div nz-col nzSpan="12" style="height: 3px;" [ngStyle]="{'background-color':accentColor}"></div>
            <div nz-col nzSpan="12" style="opacity: 0.3; height:3px" [ngStyle]="{'background-color':accentColor}"></div>
          </div>
          
          <i nz-icon [ngStyle]="{'color':accentColor}">
        <svg>
          <path
            d="M 512 64 C 264.6 64 64 264.6 64 512 s 200.6 448 448 448 s 448 -200.6 448 -448 S 759.4 64 512 64"
          />
        </svg>
      </i>
          </div>
          <h5 nz-typography class="spotify" nz-row nzJustify="space-between" [ngStyle]="{'color':accentColor}"><span>{{element.parseMoment(2)}}</span><span>{{element.parseDuration()}}</span></h5>
          <div nz-row nzJustify="space-between" nzAlign="middle">
          <i nz-icon nzType="step-backward" nzTheme="outline" style="font-size: 30px;" [ngStyle]="{'color':accentColor}"></i>
          <i nz-icon nzType="step-backward" nzTheme="outline" style="font-size: 30px;" [ngStyle]="{'color':accentColor}"></i>
          <i nz-icon nzType="play-circle" nzTheme="fill" style="font-size: 50px;" [ngStyle]="{'color':accentColor}"></i>
          <i nz-icon nzType="step-forward" nzTheme="outline" style="font-size: 30px;" [ngStyle]="{'color':accentColor}"></i>
          <i nz-icon nzType="step-forward" nzTheme="outline" style="font-size: 30px;" [ngStyle]="{'color':accentColor}"></i>
          </div>

          <div nz-row style="margin-top: 2rem;">
          <div nz-col nzSpan="24" style="padding: 3rem;">
            <img [src]="element.code(accentColor)" style="border-radius: 1rem;">
          </div>
        </div>
        </div>
      </div>
  `,
  styles: [`
  .bg-image {
    
    z-index:1;
    position: absolute;
    left: 0;
    right: 0;
  
    display: block;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
  
    -webkit-filter: blur(50px);
    -moz-filter: blur(50px);
    -o-filter: blur(50px);
    -ms-filter: blur(50px);
    filter: brightness(0.7) blur(50px);
  }
  img {
    width: 100%;
    height: auto;
  }
  `
  ]
})
export class SpotifyPortrait implements AfterViewInit {
  @Input() element!:SpotifySong
  @Input() accentColor!:string;
  constructor() { }

  ngAfterViewInit(): void {
    window.print();
  }

}
