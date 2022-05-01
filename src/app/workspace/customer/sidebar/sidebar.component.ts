
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  public items: string[] = ["Dashboard", "Favourites", "Reservations", "Ratings"];
  
  constructor() {}
  
  ngOnInit(): void {
    
  }
  
  
  
}










