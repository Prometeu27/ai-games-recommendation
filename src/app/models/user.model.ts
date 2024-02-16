export interface User {
    uid: string; // Unique identifier for the user
    email: string; // User's email address
  }
  
  export interface CategoryPreference {
    category: string;
    likes: boolean;
  }
  
  // Define the categories as a constant array
