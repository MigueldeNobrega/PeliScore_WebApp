import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MovieDetails } from '../../interfaces/details.interface';
import { combineLatest } from 'rxjs';
import { Cast } from '../../interfaces/credits.interface';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  movie?:MovieDetails;
  cast: Cast[]=[];

  constructor(private activatedRoute:ActivatedRoute, private movieSvc:MoviesService){}


  ngOnInit(){
    
    const {id} = this.activatedRoute.snapshot.params;

    combineLatest([
      this.movieSvc.movieDetails(id),
      this.movieSvc.movieCredits(id)
    ]).subscribe(([movie,cast])=>{

      if(movie === null || cast === null){
        console.error('Error: La pelicula o el reparto no se ha encontrado');

          return;
      }

        this.movie=movie;
        this.cast=cast;
    })


  }

  getStars(voteAvarage:number){

    const starsCount =Math.floor(voteAvarage);
    return Array(starsCount).fill(0);
    
  }

  goBack(){
    window.history.back();
  }


}
