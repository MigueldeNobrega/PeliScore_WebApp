import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesPosterComponent } from '../../components/movies-poster/movies-poster.component';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/billboard.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MoviesPosterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  text='';
  movies:Movie[]=[];
  noMovie='';

  constructor(private activatedRoute:ActivatedRoute, private moviesSvc:MoviesService){

  }



  ngOnInit(){
    
    this.activatedRoute.params.subscribe(params=>{

      this.text=params['text'];
    
      this.moviesSvc.searchMovies(this.text).subscribe(movies=>{
        this.movies=movies;

        if(this.movies.length==0){
          this.noMovie= 'No se ha encontrado la pelicula';
        }

      })

    })

  }



}
