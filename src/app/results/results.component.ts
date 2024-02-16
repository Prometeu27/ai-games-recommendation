import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  gameTitles: string[] = [];
  userPreferences: string[] = []; // Array to store user preferences
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loading = true;
    this.apiService.getUserPreferences().subscribe({
      next: (preferences) => {
        this.userPreferences = preferences;
        this.fetchGameRecommendations(this.userPreferences);
      },
      error: (error) => {
        console.error('Error fetching user preferences:', error);
        this.errorMessage = 'Failed to load user preferences. Please try again later.';
        this.loading = false;
      }
    });
  }

  fetchGameRecommendations(genres: string[]) {
    this.apiService.fetchRecommendations(genres).subscribe({
      next: (data) => {
        const processedString = data.games.replace(/b'([^']+)'/g, '"$1"');
        try {
          this.gameTitles = JSON.parse(processedString);
        } catch (error) {
          console.error('Error parsing the game titles:', error);
          this.errorMessage = 'Failed to parse game recommendations.';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching game recommendations:', error);
        this.errorMessage = 'Failed to load game recommendations. Please try again later.';
        this.loading = false;
      }
    });
  }
}
