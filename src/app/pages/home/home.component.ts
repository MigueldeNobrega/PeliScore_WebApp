import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


constructor(private moviesSvc:MoviesService){}

ngOnInit(): void {
 
  this.moviesSvc.getBillboard().subscribe(res=>{
    console.log(res)
  })

}

}
