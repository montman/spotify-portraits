import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpotifySong } from '../classes/spotify-song.model';
import { CloudService } from '../services/cloud.service';

@Component({
  template: `
  <div nz-row>
    <div nz-col nzSpan="12">
    <form style="margin-bottom: 1rem;" nz-form [nzLayout]="'inline'" [formGroup]="songSearch" (ngSubmit)="searchSong()">
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input a song title or artist">
          <nz-input-group nzPrefixIcon="play-circle">
            <input formControlName="title" nz-input placeholder="Song title/artist" />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary" type="submit" nzShape="round" [nzLoading]="isLoadingFunc" [disabled]="!songSearch.valid || !logged()">Search</button>
        </nz-form-control>
      </nz-form-item>
    </form>
    </div>
    <div nz-col nzSpan="12">
    <div>
      <nz-input-group nzAddOnBefore="Theme Color">
        <input type="color" [value]="accentColor" #input (change)="setColor(input.value)" nz-input />
      </nz-input-group>
    </div>
    </div>
  
    
      </div>
    
    <p *ngIf="searchResult.length == 0">No results.</p>
    <spotify-list (openedId)="closeBut($event)" [accentColor]="accentColor" style="margin-bottom: 1rem;" *ngFor="let item of searchResult" [element]="item"></spotify-list>
  `,
  styles: [
  ]
})
export class SpotifyComponent implements OnInit {
  isLoadingFunc:boolean = false;
  accentColor:string = '#ffffff'
  searchResult:SpotifySong[] = [];
  songSearch:FormGroup = new FormGroup({
    title:new FormControl('',Validators.required)
  })
  setColor(col:string) {
    this.accentColor = col;
  }
  closeBut(elementId:string) {
    this.searchResult.forEach(el=>{
      if (el.id !=elementId) el.loaded = false;
    })
  }
  logged() {
    return this.cloud.logged;
  }
  async searchSong() {
    this.searchResult = [];
    this.isLoadingFunc = true;
    this.searchResult = await this.cloud.search(this.songSearch.get('title')?.value)
    this.isLoadingFunc = false;
  }
  constructor(private cloud:CloudService) { }

  ngOnInit(): void {
    this.songSearch.setValue({title:'muse'})
    this.searchSong()
  }

}
