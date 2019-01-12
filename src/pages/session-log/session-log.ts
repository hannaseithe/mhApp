import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public db: DatabaseProvider,
    public viewCtrl: ViewController) {
    this.sessionLogForm = this.formBuilder.group({
      initialDegree: [1, Validators.required],
      endDegree: [1, Validators.required]
    });
  }

  saveSessionLog() {
    const formValues = this.sessionLogForm.value;
    this.viewCtrl.dismiss({
      initialDegree: formValues.initialDegree,
      endDegree: formValues.endDegree
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionLogPage');
  }

}
