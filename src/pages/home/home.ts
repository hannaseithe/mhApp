import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Fear } from '../../models/fear.model';
import { FearStep } from '../../models/fearStep.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  firstId: number = null;

  fears: Fear[];
  fearSteps: FearStep[];

  constructor(public navCtrl: NavController, private db: DatabaseProvider) {
    console.log('Inside Component Constructor')
    this.db.allFears.subscribe((fears) => {
      this.fears = fears;
      this.firstId = typeof fears[0] === 'undefined' ? null : fears[0].id;
      console.log("firsId ", this.firstId);
    });
  }

  ngOnInit() {
  }

  emptyDB() {
    this.db.clearTables()
  }


}
