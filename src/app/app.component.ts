import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'The Bridge';
  isIframe = false;
  loggedIn: boolean;
  name: string;

  constructor(private broadcastService: BroadcastService,
    private authService: MsalService,
    private router: Router) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.loggedIn = !!sessionStorage.getItem('msal.idtoken');
    if(this.loggedIn) {
      this.name = this.authService.getAccount().name;
    }
    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.loggedIn = true;
      this.router.navigate(['bridge']);
      this.name = this.authService.getAccount().name;
    });


    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });
  }

  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginPopup();
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logout();
  }
}
