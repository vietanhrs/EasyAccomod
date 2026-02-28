import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const baseUrl = environment.apiUrl + '/api/userfavorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }

  getAllUserFavorite(username: string) {
    return this.http.get(`${baseUrl}/user/${username}`);
  }

  getAllPostFavorite(id: number) {
    return this.http.get(`${baseUrl}/post/${id}`);
  }

  checkUserFavorite(id: number, username: string) {
    return this.http.get(`${baseUrl}/like/${username}/${id}`);
  }

  createFavorite(data: object) {
    return this.http.post(baseUrl, data);
  }

  deleteFavorite(id: number, username: string) {
    return this.http.delete(`${baseUrl}/${username}/${id}`);
  }
}
