import { Injectable } from '@angular/core';

class User {
  firstName: string
  lastName: string
  email: string
  username: string
  mobile?: string
  address?: string
  password: string
}

const miko: User = {
  firstName: 'miko',
  lastName: 'yin',
  email: 'yin@mail.com',
  username: 'miyi',
  password: 'yaomingi',
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [miko];
  loggedUser: User;

  constructor() { }

  signUp(user: User) {
    return new Promise((resolve, _reject) => {
      this.users.push(user);
      this.loggedUser = user;
      resolve(this.loggedUser);
    })
  }

  login(user?: {username: string, password: string}): Promise<User|Error> {
    return new Promise((resolve, reject) => {
      const isAUser = this.users.find(u => u.username === user.username);
      if (isAUser) {
        if (isAUser.password === user.password) {
          resolve(isAUser);
        } else {
          reject(new Error('Incorrect username password combo!'));
        }
      } else {
        reject(new Error('No user by that name!'));
      }
    });
  }
}