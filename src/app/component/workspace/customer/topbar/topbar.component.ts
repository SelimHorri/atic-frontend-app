
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  
  public authenticatedUsername: string = `${sessionStorage.getItem(`username`)}`;
  
  constructor() {}
  
  ngOnInit(): void {
    
  }
  
  public onClickToggleMenu(): void {
    window.addEventListener('DOMContentLoaded', event => {

      // Toggle the side navigation
      // const sidebarToggle = document.body.querySelector('#sidebarToggle');
      const sidebarToggle = document.getElementById('sidebarToggle');
      if (sidebarToggle) {
        // comment Below to persist sidebar toggle between refreshes
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
          document.body.classList.toggle('sb-sidenav-toggled');
        }
        sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          // localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
      }

    });
  }
  
  
  
}










