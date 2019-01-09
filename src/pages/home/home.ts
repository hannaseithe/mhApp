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

  fears: Fear[];
  fearSteps: FearStep[];

  constructor(public navCtrl: NavController, private db: DatabaseProvider) {
    console.log('Inside Component Constructor')
    this.db.allFears.subscribe((fears) => {
      this.fears = fears;
      if (typeof fears[0] !== 'undefined') {
        this.db.getExtendedFearSteps(fears[0].id)
        .then((result) => this.fearSteps = result.fearSteps);
      
      };
    });
  }

  ngOnInit() {
  }

  emptyDB() {
    this.db.clearTables()
  }


}
