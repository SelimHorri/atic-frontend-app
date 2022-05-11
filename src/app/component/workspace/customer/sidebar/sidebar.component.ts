
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  public items: any[] = [
    { 
      name: "Dashboard",
      link: "index",
      subItems: [] 
    },
    {
      name: "Reservations",
      link: "reservations",
      subItems: [
        {
          name: "Appointments",
          link: "reservations",
          subItems: []
        },
      ]
    },
    {
      name: "Favourites",
      link: "favourites",
      subItems: []
    },
    {
      name: "Ratings",
      link: "ratings",
      subItems: []
    },
  ]; // = ["Dashboard", "Favourites", "Reservations", "Ratings"];
  
  constructor() {}
  
  ngOnInit(): void {
    
  }
  
  
  
}










