import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/billboard.interface';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-movies-poster',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './movies-poster.component.html',
  styleUrl: './movies-poster.component.css'
})
export class MoviesPosterComponent {

  @Input() movies?:Movie[];

  constructor(private router:Router){}


  getStars(voteAvarage:number){

    const starsCount = Math.floor(voteAvarage);

    return Array(starsCount).fill(0);


  }

  onMovieClick(movie:Movie){

    this.router.navigate(['/movies',movie.id])

  }


}
