import { Component, OnInit } from '@angular/core';
import { CsrfService } from './services/csrf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularClient';

  constructor(private csrfService: CsrfService) {}

  ngOnInit(): void {
    this.csrfService.loadToken().catch(() => {});
  }
}
