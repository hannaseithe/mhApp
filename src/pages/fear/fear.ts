import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Fear } from '../../models/fear.model';
import { FearStep } from '../../models/fearStep.model';
import { FearStepPage } from '../fear-step/fear-step';
import { SessionPage } from '../session/session';

/**
 * Generated class for the FearPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fear',
  templateUrl: 'fear.html',
})
export class FearPage {

  fearId: number;
  fear: Fear;
  fearSteps: FearStep[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DatabaseProvider,
    public modalCtrl: ModalController,
    public ref: ChangeDetectorRef) {

    this.fearId = navParams.get('id');
    this.db.getFear(this.fearId)
      .then((result) => {
        this.fear = result
      })
    this.db.getExtendedFearSteps(this.fearId)
      .then((result) => {
        this.fearSteps = result;
        this.ref.detectChanges();
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FearPage');
  }

  addFearStep() {
    const modal = this.modalCtrl.create(FearStepPage);
    modal.onDidDismiss(data => {
      console.log('Page Fear on Modal Dismiss');
      const newFearStep: FearStep = {
        name: data.name,
        description: data.description,
        initialDegree: data.initialDegree,
        fearId: this.fearId,
        creationDate: Date.now()
      }
      this.db.saveOrUpdateFearStep(newFearStep)
        .then(() => this.db.getExtendedFearSteps(this.fearId))
        .then((result) => this.fearSteps = result)
    });
    modal.present();
  }

  train() {
    const modal = this.modalCtrl.create(SessionPage, {
      fear: this.fear,
      fearSteps: this.fearSteps  
    });
    modal.onDidDismiss(() => {
      this.db.getExtendedFearSteps(this.fearId)
      .then((result) => {
        this.fearSteps = result;
        this.ref.detectChanges();
      })
    });
    modal.present();
  }

}
