import { Component, OnInit } from '@angular/core';
// I import Location so that I can query the current path
import { Location } from '@angular/common';
// I also import Router so that I can subscribe to events
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sideBarTitle: string;

  constructor(location: Location, router: Router) {
    // within our constructor we can define our subscription
    // and then decide what to do when this event is triggered.
    // in this case I simply update my route string.
    router.events.subscribe((val) => {
      if (location.path() != '') {
        if(location.path() == '/about'){
          this.sideBarTitle = "About Us";
        } else if (location.path() == '/blog'){
          this.sideBarTitle = "Blog";
        }
      }
    });
  }

  ngOnInit() {
    // this.sideBarTitle = "Blog";
  }

}
