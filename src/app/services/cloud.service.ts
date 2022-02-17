import { Injectable } from '@angular/core';
import * as Realm from "realm-web";
import { serverInfo } from 'src/environments/environment.prod';
import { SpotifySong } from '../classes/spotify-song.model';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  appInfo = serverInfo
  app = new Realm.App({id:this.appInfo.appId})
  logged:boolean = false;
  async initUser() {
    if (!this.app.currentUser) await this.app.logIn(Realm.Credentials.anonymous())
    this.logged = true;
  }
  execute(funcName:string,param?:any) {
    return this.app.currentUser?.callFunction(funcName,param)
  }
  async search(title:string):Promise<SpotifySong[]> {
    let res:any = await this.execute('searchByTitle',title);
    return res.map((el:any)=>new SpotifySong(el.id,el.title,el.artist,el.link,el.duration,el.cover,el.album));
  }
  constructor() { 
    this.initUser();
  }
}
