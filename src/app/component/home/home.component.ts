
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {
    
  }
  
  public onOpenModal(action: string): void {
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    
    if (action === "login") {
      button.setAttribute("data-target", "#login");
      console.log("login target");
    }
    if (action === "register") {
      button.setAttribute("data-target", "#register");
      console.log("register target");
    }
     
    const mainContainer = document.getElementById("main-container");
    mainContainer?.appendChild(button);
    button.click();
    console.log("button clicked");
  }
  
  
  
}













