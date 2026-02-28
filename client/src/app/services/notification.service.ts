import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const baseUrl = environment.apiUrl + '/api/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getUserNotification(username: string) {
    return this.http.get(`${baseUrl}/${username}`);
  }

  createNotification(data: object) {
    return this.http.post(baseUrl, data);
  }
}
