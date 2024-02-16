import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedComponent } from './logged/logged.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ResultsComponent } from './results/results.component';
import { VisitorComponent } from './visitor/visitor.component';
import { AuthGuard } from './auth.guard'; // Adjust the path as necessary
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', component: VisitorComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'logged', component: LoggedComponent, canActivate: [AuthGuard] },
  { path: 'main', component: MainViewComponent, canActivate: [AuthGuard] },
  { path: 'results', component: ResultsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}