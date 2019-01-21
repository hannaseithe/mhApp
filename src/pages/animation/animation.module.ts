import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimationPage } from './animation';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AnimationPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimationPage),
    ComponentsModule
  ],
})
export class AnimationPageModule {}
