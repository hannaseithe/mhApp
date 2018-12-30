import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  value: void | any[];

  constructor(public navCtrl: NavController, private db: DatabaseProvider) {
    console.log('Inside Component Constructor')
  }

  ngOnInit() {
    this.db.isReady
    .then(() => this.db.getAllFears())
    .then((result) => {
      console.log(result);
      this.value = result;
    })
  }

  emptyDB() {
    this.db.clearTables()
  }

  
}
