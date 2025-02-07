import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

constructor(private router:Router){
  
}

goToForo() {
  window.location.href = '/assets/Foro/index.html';
}



  ngOnInit(): void {
    
  }

  searchMovie(text:string){
    text=text.trim();
    if(text.length === 0){
      return;
    }

    this.router.navigate(['/search', text]);

  }

}
