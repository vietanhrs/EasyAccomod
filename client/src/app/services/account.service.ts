import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  accountUrl = environment.apiUrl + '/api/accounts'
  userUrl = environment.apiUrl + '/api/users'

  getAccountByQuery(query: string) {
    return this.http.get(this.accountUrl + query, { responseType: 'json' })
  }

  // Verified account with correspoding username
  updateAccount(username: string, option: Object) {
    return this.http.put(this.accountUrl + `/${username}`, option)
  }

  // Get user information corresponding to account with given username
  getAccountInfo(username: string) {
    return this.http.get(this.accountUrl + `/info/${username}`)
  }
}
