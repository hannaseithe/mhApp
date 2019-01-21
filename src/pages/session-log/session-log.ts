import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { FearStep } from '../../models/fearStep.model';
import { AnimationComponent } from '../../components/animation/animation';
import { AnimationPage } from '../animation/animation';

/**
 * Generated class for the SessionLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-session-log',
  templateUrl: 'session-log.html',
})
export class SessionLogPage {

  sessionLogForm: FormGroup;
  fearStep: FearStep;
  initialDegree: number;
  step: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public db: DatabaseProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController) {

    this.fearStep = this.navParams.get('fearStep');
    this.initialDegree = this.fearStep.sessionLogs ? this.fearStep.sessionLogs.pop().initialDegree : this.fearStep.initialDegree;
    this.sessionLogForm = this.formBuilder.group({
      initialDegree: [this.initialDegree, Validators.required],
      endDegree: [this.initialDegree, Validators.required]
    });
  }

  saveSessionLog() {
    const formValues = this.sessionLogForm.value;
    this.viewCtrl.dismiss({
      initialDegree: formValues.initialDegree,
      endDegree: formValues.endDegree
    })
  }

  enterInitialDegree() {
    this.step = 2;
    this.animate();
  }

  enterEndDegree() {
    this.step = 3;
    this.animate();
  }
  animate() {
    let modal = this.modalCtrl.create(AnimationPage, {});
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionLogPage');
  }

}
