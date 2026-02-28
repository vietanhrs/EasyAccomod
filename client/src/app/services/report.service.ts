import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    reportUrl = environment.apiUrl + '/api/report'

    constructor(private http: HttpClient) { }

    getAllReport(queryString: string) {
        return this.http.get(this.reportUrl + queryString)
    }

    deleteReport(reportID: number) {
        return this.http.delete(this.reportUrl + `/${reportID}`)
    }
}