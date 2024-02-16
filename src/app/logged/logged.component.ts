import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface CategoryPreference {
  category: string;
  likes: boolean;
}

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.scss'
})

export class LoggedComponent implements OnInit {
  genres: string[] = ['Shooter', 'RPG', 'Puzzle', 'Simulator', 'Sports', 'Arcade', 'Horror', 'Survival', 'Fighting', 'Strategy', 'MMO', 'Action', 'Brawler', 'Indie', 'Turn Based Strategy', 'Adventure', 'Platform', 'Music', 'Visual Novel', 'Point-and-Click', 'Tactical'];
  userPreferences: string[] = []; // Updated to array of strings
  userId: string | null = null;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userId = user.uid;
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    ).subscribe((userData: any) => {
      if (userData && userData.preferences) {
        this.userPreferences = userData.preferences;
      }
    });
  }

  toggleGenrePreference(genre: string) {
    const index = this.userPreferences.indexOf(genre);
    if (index > -1) {
      this.userPreferences.splice(index, 1); // Remove genre if it's already in the array
    } else {
      this.userPreferences.push(genre); // Add genre if it's not in the array
    }

    if (this.userId) {
      this.firestore.collection('users').doc(this.userId).update({
        preferences: this.userPreferences
      });
    }
  }

  isGenreSelected(genre: string): boolean {
    return this.userPreferences.includes(genre); // Check if the array includes the genre
  }
}
