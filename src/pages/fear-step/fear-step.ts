import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the FearStepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fear-step',
  templateUrl: 'fear-step.html',
})
export class FearStepPage {

  fearStepForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder) {
      this.fearStepForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        initialDegree: [1, Validators.required]
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FearStepPage');
  }

  addFearStep() {
   this.viewCtrl.dismiss(this.fearStepForm.value);
  }
 

}
