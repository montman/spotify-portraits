import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpotifySong } from '../classes/spotify-song.model';
import { CloudService } from '../services/cloud.service';

@Component({
  template: `
    <div class="row mb-2">
      <div class="col">
        <form nz-form [formGroup]="songSearch" (ngSubmit)="searchSong()">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              formControlName="title"
              placeholder="Song title/artist"
            />
            <div class="input-group-append">
              <button
                class="btn btn-primary"
                type="submit"
                [disabled]="!songSearch.valid || !logged() || isLoadingFunc"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Template Accent Color</span>
          </div>
          <input
          type="color"
          class="form-control"
          [value]="accentColor"
          #input
          (change)="setColor(input.value)"
        />
        </div>
        
      </div>
    </div>

    <p *ngIf="alreadySearched && searchResult.length == 0 && !isLoadingFunc">
      No results.
    </p>
    <spotify-list
      (openedId)="closeBut($event)"
      [accentColor]="accentColor"
      style="margin-bottom: 1rem;"
      *ngFor="let item of searchResult"
      [element]="item"
    ></spotify-list>
  `,
  styles: [],
})
export class SpotifyComponent implements OnInit {
  isLoadingFunc: boolean = false;
  accentColor: string = "#ffffff";
  searchResult: SpotifySong[] = [];
  alreadySearched: boolean = false;
  songSearch: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
  });
  setColor(col: string) {
    this.accentColor = col;
  }
  closeBut(elementId: string) {
    this.searchResult.forEach((el) => {
      if (el.id != elementId) el.loaded = false;
    });
  }
  logged() {
    return this.cloud.logged;
  }
  async searchSong() {
    this.searchResult = [];
    this.isLoadingFunc = true;
    this.searchResult = await this.cloud.search(
      this.songSearch.get("title")?.value
    );
    this.isLoadingFunc = false;
    this.alreadySearched = true;
  }
  constructor(private cloud: CloudService) {}

  ngOnInit(): void {}
}
