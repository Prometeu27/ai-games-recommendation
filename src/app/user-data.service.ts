import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User, CategoryPreference } from './models/user.model';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore // For Firebase Firestore operations
  ) {}

  initializeUserPreferences(userFirebase: firebase.User): User {


    const user: User = {
      uid: userFirebase.uid,
      email: userFirebase.email || '',
    };

    // Optionally, save the user data to Firebase Firestore
    this.saveUserData(user);

    return user;
  }

  saveUserData(user: User): Promise<void> {
    return this.firestore.collection('users').doc(user.uid).set(user);
  }

  // Add more methods as needed (e.g., getUserData, updateUserPreferences, etc.)
}