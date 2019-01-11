import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FearPage } from './fear';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FearPage,
  ],
  imports: [
    IonicPageModule.forChild(FearPage),
    ComponentsModule
  ],
})
export class FearPageModule {}
