export class SpotifySong {
    title:string;
    id:string;
    cover:string; //base 64
    link:string;
    artist:string;
    duration:number; //seconds
    album:string
    loaded:boolean = false;
    parseMoment(factor:number) {
        let moment = this.duration/factor;
        return Math.floor(moment/60)+':'+(moment%60).toString().padStart(2,'0');
    }
    constrast(hex:string) {
        let val = ['white','black'];
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        let brightness = 123;
        if (result) brightness = (parseInt(result[1], 16) * 299 + parseInt(result[2], 16) * 587 + parseInt(result[3], 16) * 114) / 1000
        if (brightness>123) return val[1];
        else return val[0]
    }
    code(accent:string) {
        return `https://scannables.scdn.co/uri/plain/png/${accent.substring(1)}/${this.constrast(accent.substring(1))}/640/${this.link}`
    }
    parseDuration() {
        return Math.floor(this.duration/60)+':'+(this.duration%60).toString().padStart(2,'0');
    }
    constructor(id:string,title:string,artist:string,link:string,duration:number,cover:string,album:string) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.link = link;
        this.duration = duration;
        this.cover = cover;
        this.album = album;
    }
}