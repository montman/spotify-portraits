import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">{{title}}</a>
  </div>
</nav>
<div class="container p-2">
  <router-outlet></router-outlet>
</div>
  `,
  styles: [``]
})
export class AppComponent {
  title:string = '';
  constructor(private route:ActivatedRoute,private router:Router) {
    this.router.events.subscribe(el=>{
      this.title = this.route.snapshot.firstChild?.data.title;
    })
  }
}
