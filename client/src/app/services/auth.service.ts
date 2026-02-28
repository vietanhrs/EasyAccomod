import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Account } from '../_model/account'
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentAccountSubject: BehaviorSubject<Account>;

    private apiUrl = environment.apiUrl + '/api/accounts'

    constructor(private http: HttpClient, private accountService: AccountService) {
        this.currentAccountSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentAccount') || 'null'));
    }

    public get currentUserValue(): Account {
        return this.currentAccountSubject.value;
    }

    signIn(form: FormData) {
        return this.http.post<any>(this.apiUrl + '/login', form, { responseType: 'json', withCredentials: true }).pipe(map(user => {
            if (user && user.username) {
                localStorage.setItem('currentAccount', JSON.stringify(user));
                this.currentAccountSubject.next(user);
            }

            return user;
        }));
    }

    signUp(form: FormData) {
        return this.http.post<any>(this.apiUrl, form, { responseType: 'json', withCredentials: true })
            .pipe(map(user => {
                if (user && user.username) {
                    localStorage.setItem('currentAccount', JSON.stringify(user));
                    this.currentAccountSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        this.accountService.updateAccount(this.currentUserValue.username, { online: false }).subscribe()
        this.http.post(this.apiUrl + '/logout', {}, { withCredentials: true }).subscribe()
        localStorage.removeItem('currentAccount');
        this.currentAccountSubject.next(null);
        location.reload()
    }

    changePassword(form: FormData) {
        var loginInfo = new FormData()

        let result = 1;

        loginInfo.set('username', this.currentUserValue.username)
        loginInfo.set('password', form.get('currentpwd') as string)

        this.signIn(loginInfo).subscribe(data => {
            if (data.username) {
                this.accountService.updateAccount(
                    this.currentUserValue.username,
                    {
                        password: form.get('newpwd')
                    }).
                subscribe(data => { })
            }
            else {
                return 2;
            }
        })
        return result;
    }
}
