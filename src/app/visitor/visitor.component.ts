import { Component, OnInit } from '@angular/core';
import { MainViewComponent } from '../main-view/main-view.component';
import { ResultsComponent } from '../results/results.component';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.scss'
})
export class VisitorComponent {
  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    private apiService: ApiService
  ) {}
  gameTitles: string[] = [];

  // recommendations: any;

  ngOnInit() {
    // this.apiService.getRecommendations("['Adventure', 'Puzzle']").subscribe(titles => {
    //   this.gameTitles = titles;
    //   console.log('Game Titles:', this.gameTitles);
    // });

    // Handle user data after login
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authService.handleUserData(user);
      }
    });
  }

  // getRecommendations() {
  //   const genres = "['Adventure', 'Puzzle']";
  //   this.apiService.getRecommendations(genres).subscribe(
  //     data => {
  //       this.recommendations = data;
  //       console.log(this.recommendations);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }
  // googleLogin() {
  //   this.authService.GoogleAuth().then(() => {
  //     this.afAuth.authState.subscribe(user => {
  //       if (user) {
  //         this.authService.handleUserData(user); // nu merge, trebuie gasita o solutie pt a adauga user model ul in db odata cu logarea
  //       }
  //     });
  //   }).catch(error => {
  //     console.error('Login failed:', error);
  //   });
  // }
}
