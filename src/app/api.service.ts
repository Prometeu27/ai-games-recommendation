import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private nodeServerUrl = 'http://localhost:3000/fetch-games'; // Node.js server URL

  constructor(
    private http: HttpClient, 
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  fetchRecommendations(genres: string[]): Observable<any> {
    return this.http.post(this.nodeServerUrl, { genres });
  }

  getUserPreferences(): Observable<string[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges().pipe(
            switchMap((userData: any) => {
              return of(userData ? userData.preferences : []);
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }
}
