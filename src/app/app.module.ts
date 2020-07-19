import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BridgeModule } from './bridge/bridge.module';
import { MsalModule, MsalInterceptor, MsalAngularConfiguration, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalService } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

function MSALConfigFactory() {
  return {
    auth: {
      clientId: '516d6df1-77b6-4cfa-8c2c-577662ddd794',
      authority: "https://login.microsoftonline.com/875be2b1-eab3-4781-b548-910cf9a2699a/",
      validateAuthority: true,
      redirectUri: "http://localhost:4200/",
      postLogoutRedirectUri: "http://localhost:4200/",
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      "user.read",
      "openid",
      "profile"
    ],
    unprotectedResources: [],
    protectedResourceMap,
    extraQueryParameters: {}
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    BridgeModule,
    MsalModule,
    MatButtonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: MSAL_CONFIG,
    useFactory: MSALConfigFactory
  },
  {
    provide: MSAL_CONFIG_ANGULAR,
    useFactory: MSALAngularConfigFactory
  },
    MsalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
