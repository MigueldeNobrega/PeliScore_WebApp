import { CommonModule } from '@angular/common';
import { Component, Host, HostListener, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/billboard.interface';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { MoviesPosterComponent } from '../../components/movies-poster/movies-poster.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlideshowComponent, MoviesPosterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  movies:Movie[]=[];
  loadedMoviesIds = new Set<number>();

  @HostListener('window:scroll',['$event'])
  onScroll(){

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;

    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos>max){
      this.loadMoreMovies();
    }

  }


constructor(private moviesSvc:MoviesService){}

ngOnInit(): void {
 
  this.loadMovies();

}

loadMovies(){

  this.moviesSvc.getBillboard().subscribe(res=>{

    this.movies = res;
    this.updateLoadedMoviesIds();
    
  })

}

loadMoreMovies(){
  this.moviesSvc.getBillboard().subscribe(res=>{
    const newMovies = res.filter(movie=>!this.loadedMoviesIds.has(movie.id));
    this.movies.push(...newMovies);
    this.updateLoadedMoviesIds();
  })
}

updateLoadedMoviesIds(){

  this.movies.forEach(movie=>this.loadedMoviesIds.add(movie.id));


}


}
