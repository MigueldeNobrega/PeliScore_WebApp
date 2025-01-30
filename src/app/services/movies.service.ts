import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BillboardResponse, Movie } from '../interfaces/billboard.interface';
import { MovieDetails } from '../interfaces/details.interface';
import { Cast, Credits } from '../interfaces/credits.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private URL = 'https://api.themoviedb.org//3';
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Nzc3ZDQxYWY4ZDQyNjFhYjA2NTBjNjgzMmNjMjI4YyIsIm5iZiI6MTczNjYyMjA1Mi4yODEsInN1YiI6IjY3ODJiZmU0MmIyOWE5MThkMDRlYjUyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._oNNtB6QBHaYOO9tW0Qj9XV_UF_i03Mtte8ijaotBvo';

  private headers={Authorization:`Bearer ${this.apiKey}`};

  private billboardPage=1;
  public loading=false;

  constructor(private http:HttpClient) { }

  getBillboard():Observable<Movie[]>{

    if(this.loading){
      return of([]);
    }

    this.loading=true;

    return this.http.get<BillboardResponse>(`${this.URL}/movie/now_playing?language=es-ES&page=${this.billboardPage}`,{headers:this.headers}).pipe(
      map((response:any)=>response.results),

      tap(()=>{
        this.billboardPage+=1;
        this.loading=false;
      })
    )

  }

 searchMovies(text:string):Observable<Movie[]>{
  return this.http.get<BillboardResponse>(`${this.URL}/search/movie?query=${text}&language=es-ES&page=1`,{headers:this.headers}).pipe(map(res=>res.results))
 }


  movieDetails(id:string){

    return this.http.get<MovieDetails>(`${this.URL}/movie/${id}?language=es-ES`,{headers:this.headers}).pipe(

      catchError(err=> of(null))

    )

  }

  movieCredits(id:string):Observable<Cast[] | null>{

    return this.http.get<Credits>(`${this.URL}/movie/${id}/credits?language=es-ES`,{headers:this.headers}).pipe(

      map(res=>res.cast),
      catchError(err=> of(null))

    )

  }




 resetMoviePage(){

  this.billboardPage=1;

 }



}
