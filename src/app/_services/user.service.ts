import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getCurrent() {
        return this.http.get<User>(`${environment.apiUrl}/users/current`);
    }

    getById(id) {
        return this.http.get<User>(`${environment.apiUrl}/users/` + id);
    }

   lookupUser(text) {
        if(text == ''){
          return this.http.get<User[]>(`${environment.apiUrl}/users`);
        }else{
          return this.http.get<User[]>(`${environment.apiUrl}/users/lookupUser/` + text);
        }
    }

    findByUserName(name){
      return this.http.get<User[]>(`${environment.apiUrl}/users/findByUserName/` + name);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }

    updateUserPatch(user: User) {
        return this.http.patch(`${environment.apiUrl}/users/` + user.id, user);
    }

    changePassword(id,params){
        return this.http.put<{data: number ,message:string}>(`${environment.apiUrl}/users/changePassword/` + id, params);
    }

}
