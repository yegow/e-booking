import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../schemas/user';
import { apiEnd, url } from './config';
import { EBResponse } from '../schemas/server-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersUrl = url + apiEnd + '/auth';

  loggedUser: User = null;
  users: User[] = [];
  redirectUrl = '';

  constructor(
    private http: HttpClient
  ) {}

  signUp(user: User): Observable<HttpResponse<EBResponse>> {
    return this.http.post<EBResponse>(
      `${this.usersUrl}/signup`,
      user,
      {observe: 'response'}
    );
  }

  login(user?: {username: string, password: string}): Observable<HttpResponse<EBResponse>> {
    return this.http.post<EBResponse>(
      `${this.usersUrl}/login`,
      {...user},
      {observe: 'response'}
    );
  }
}
