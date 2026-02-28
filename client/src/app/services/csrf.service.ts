import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CsrfService {
    private token: string | null = null;
    private readonly tokenUrl = environment.apiUrl + '/api/csrf-token';

    constructor(private http: HttpClient) {}

    loadToken(): Promise<void> {
        return this.http
            .get<{ csrfToken: string }>(this.tokenUrl, { withCredentials: true })
            .toPromise()
            .then(res => { this.token = res.csrfToken; });
    }

    getToken(): string | null {
        return this.token;
    }
}
