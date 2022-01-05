import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {PictureModalPage} from './pages/modals/picture-modal/picture-modal.page';
import {environment} from '../environments/environment';
import {ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAnalyticsModule} from '@angular/fire/compat/analytics';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {FormsModule} from '@angular/forms';
import {FilterModalPage} from './pages/modals/filter-modal/filter-modal.page';
import {CoreModule} from './core/core.module';
import {MenuComponent} from './core/components/menu/menu.component';
import {AppInitService} from './core/services/app-init.service';
import {ShareModalPage} from './pages/modals/share-modal/share-modal.page';

export const initApp = (appInitService: AppInitService) => async () => {
  await appInitService.init();
  return Promise.resolve();
};


@NgModule({
  declarations: [
    AppComponent,
    PictureModalPage,
    FilterModalPage,
    ShareModalPage,
    MenuComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    CoreModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppInitService], multi: true
    },
    ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
