import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/billboard.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  movies:Movie[]=[];

constructor(private moviesSvc:MoviesService){}

ngOnInit(): void {
 
  this.loadMovies();

}

loadMovies(){

  this.moviesSvc.getBillboard().subscribe(res=>{

    this.movies = res;
    
  })

}


}
