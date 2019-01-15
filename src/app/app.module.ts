import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { ComponentsModule } from '../components/components.module';
import { FearPageModule } from '../pages/fear/fear.module';
import { FearStepPageModule } from '../pages/fear-step/fear-step.module';
import { SessionPageModule } from '../pages/session/session.module';
import { SessionLogPageModule } from '../pages/session-log/session-log.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FearPageModule,
    FearStepPageModule,
    SessionPageModule,
    SessionLogPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider
  ]
})
export class AppModule {}
