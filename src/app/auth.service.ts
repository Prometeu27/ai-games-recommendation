import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { User } from './models/user.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  handleUserData(user: firebase.User) {
    const userRef = this.firestore.collection('users').doc(user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      };
    return userRef.set(userData, { merge: true });
  }

  AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        const isNewUser = result.additionalUserInfo?.isNewUser;
        const user = result.user;
        if (isNewUser && user) {
          this.initializeUserData(user);
        }
        this.router.navigate(['/main']); // Navigate on successful login
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private initializeUserData(userFirebase: firebase.User) {
    const newUser: User = {
      uid: userFirebase.uid,
      email: userFirebase.email || '',
      
    };

    this.firestore.collection('users').doc(newUser.uid).set(newUser);
  }
}