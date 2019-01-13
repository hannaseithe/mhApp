import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FearStep } from '../../models/fearStep.model';
import { Fear } from '../../models/fear.model';
import { DatabaseProvider } from '../../providers/database/database';
import { SessionLogPage } from '../session-log/session-log';
import { SessionLog } from '../../models/sessionLog.model';
import { Session } from '../../models/session.model';

/**
 * Generated class for the SessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-session',
  templateUrl: 'session.html',
})
export class SessionPage {

  fear: Fear;
  fears: Fear[] = [];
  fearSteps: FearStep[] = [];
  session: Session;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController) {

    this.fear = navParams.get('fear');
    this.fearSteps = navParams.get('fearSteps');
    this.session = {
      number: 0,
      startDate: Date.now(),
      endDate: Date.now(),
      note: null,
      fearId: this.fear.id
    }

    if (!this.fear) {
      this.db.getAllFears()
        .then((result) => {
          this.fears = result;
        })
    }
    if (this.fear && !this.fearSteps) {
      this.db.getExtendedFearSteps(this.fear.id)
        .then((result) => {
          this.fearSteps = result;
        })
    }
  }

  selectFear(fear: Fear) {
    this.fear = fear;
    this.db.getExtendedFearSteps(this.fear.id)
      .then((result) => {
        this.fearSteps = result;
      })
  }

  train(fearStep: FearStep) {
    console.log('train! ', JSON.stringify(fearStep))
    const modal = this.modalCtrl.create(SessionLogPage, {
      fearStep: fearStep
    });
    modal.onDidDismiss(data => {
      console.log('Page Fear on Modal Dismiss');
      if (!this.session.id) {
        this.db.saveOrUpdateSession(this.session)
          .then((result) => {
            this.session.id = result.insertId;
            const newSessionLog: SessionLog = {
              sessionId: this.session.id,
              fearStepId: fearStep.id,
              initialDegree: data.initialDegree,
              endDegree: data.endDegree,
              date: Date.now()
            }
            this.db.saveOrUpdateSessionLog(newSessionLog)
          })
      } else {
        const newSessionLog: SessionLog = {
          sessionId: this.session.id,
          fearStepId: fearStep.id,
          initialDegree: data.initialDegree,
          endDegree: data.endDegree,
          date: Date.now()
        }
        this.db.saveOrUpdateSessionLog(newSessionLog)
      }
    });
    modal.present();
  }

  finishSession() {
    const updatedSession: Session = {
      id: this.session.id,
      number: 0,
      startDate: this.session.startDate,
      endDate: Date.now(),
      note: this.session.note,
      fearId: this.fear.id
    }
    this.db.saveOrUpdateSession(updatedSession)

    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
  }

}
