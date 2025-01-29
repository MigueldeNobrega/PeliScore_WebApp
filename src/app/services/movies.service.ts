import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BillboardResponse, Movie } from '../interfaces/billboard.interface';

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

 

}
