import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component'
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [

{path:'home', component:HomeComponent},
{path:'movies/:id', component:MoviesComponent},
{path:'search/:text', component:SearchComponent },


//Si la ruta está vacía o hay un error me redirige a la pantalla Home:
{path:'', pathMatch:'full', redirectTo:'/home'},
{path:'**', redirectTo:'/home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
