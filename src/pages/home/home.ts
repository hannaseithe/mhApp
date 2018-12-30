import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Fear } from '../../models/fear.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fears: Fear[];

  constructor(public navCtrl: NavController, private db: DatabaseProvider) {
    console.log('Inside Component Constructor')
    this.db.allFears.subscribe((fears) => this.fears = fears)
  }

  ngOnInit() {
  }

  emptyDB() {
    this.db.clearTables()
  }


}
