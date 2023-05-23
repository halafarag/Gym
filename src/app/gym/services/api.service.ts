import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, find, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  users!: User[];
  constructor(private http: HttpClient) {}
  register(user: User): Observable<User> {
    return this.http.post<User>(
      `https://gym-data.vercel.app/users/register`,
      user
    );
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`https://gym-data.vercel.app/users`);
  }
  getUserByID(userID: String): Observable<User> {
    return this.http.get<User>(`https://gym-data.vercel.app/users/${userID}`);
  }
  deleteUser(userID: string): Observable<User> {
    return this.http.delete<User>(
      `https://gym-data.vercel.app/users/${userID}`
    );
  }
  updateUser(userID: string, userUpdate: User): Observable<User> {
    return this.http.put<User>(
      `https://gym-data.vercel.app/users/${userID}`,
      userUpdate
    );
  }
}
