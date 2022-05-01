
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
      link: "",
      subItem: [] 
    },
    {
      name: "Favourites",
      link: "favourites",
      subItem: []
    },
    {
      name: "Reservations",
      link: "reservations",
      subItem: []
    },
    {
      name: "Ratings",
      link: "ratings",
      subItem: []
    },
  ]; // = ["Dashboard", "Favourites", "Reservations", "Ratings"];
  
  constructor() {}
  
  ngOnInit(): void {
    
  }
  
  
  
}










