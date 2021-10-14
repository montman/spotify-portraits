import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <nz-layout class="layout">
  <nz-sider nzCollapsible nzBreakpoint="lg" [nzCollapsedWidth]="0">
   <app-menu></app-menu>
  </nz-sider>
  <nz-layout>
    <nz-header><h3 style="margin-left: 1rem;">{{title}}</h3></nz-header>
    <nz-content>
      <div class="inner-content"><router-outlet></router-outlet></div>
    </nz-content>
    <nz-footer>Experiments by @montman</nz-footer>
  </nz-layout>
</nz-layout>
  `,
  styles: [`
  .layout {
  min-height: 100vh;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

nz-header {
  background: #fff;
  padding: 0;
}

nz-content {
  margin: 24px 16px 0;
}

.inner-content {
  padding: 24px;
  background: #fff;
}

nz-footer {
  text-align: center;
}
  `]
})
export class AppComponent {
  isCollapsed = false;
  title:string = 'dsddfsdfdsfsdfffs';
  constructor(private route:ActivatedRoute,private router:Router) {
    this.router.events.subscribe(el=>{
      this.title = this.route.snapshot.firstChild?.data.title;
    })
  }
}
