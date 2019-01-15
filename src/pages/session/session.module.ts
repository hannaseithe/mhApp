import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionPage } from './session';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SessionPage,
  ],
  imports: [
    IonicPageModule.forChild(SessionPage),
    ComponentsModule
  ],
})
export class SessionPageModule {}
