import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatabaseProvider } from './database';


describe('Database Provider', () => {
    let service: DatabaseProvider;
    beforeEach(() => { service = new DatabaseProvider(SQLiteMock); });

});