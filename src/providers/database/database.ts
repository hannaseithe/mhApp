import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  db: SQLiteObject = null;
  isReady: boolean = false;

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.isReady = true;
      })
      .catch(e => console.log(e));
  }

  createDB() {
    if (this.isReady) {
      const fearTable: string =
        `create table fear(
        id INTEGER PRIMARY KEY,
        name VARCHAR(32),
        description VARCHAR(256)
      )`;
      const fearStepTable: string =
        `create table fearStep(
        id INTEGER PRIMARY KEY,
        name VARCHAR(128),
        description VARCHAR(256),
        initialDegree FLOAT(2,1),
        creationDate SMALLDATETIME,
        fearId INTEGER,
        FOREIGN KEY(fearId) REFERENCES fear(id)
        )`;
      const sessionTable: string =
        `create table session(
        id INTEGER PRIMARY KEY,
        number INTEGER,
        startDate SMALLDATETIME,
        endDate SMALLDATETIME,
        note VARCHAR(256),
        fearId INTEGER,
        FOREIGN KEY(fearId) REFERENCES fear(id)
        )`;
      const sessionLogTable: string =
        `create table sessionLog(
      id INTEGER PRIMARY KEY,
        sessionId INTEGER,
        fearStepId INTEGER,
        initialDegree FLOAT(2,1),
        endDegree FLOAT(2,1),
        date SMALLDATETIME,
        note VARCHAR(256),
        FOREIGN KEY(sessionId) REFERENCES session(id),
        FOREIGN KEY(fearStepId) REFERENCES fearStep(id)
        )`;


      this.db.sqlBatch([
        fearTable,
        fearStepTable,
        sessionTable,
        sessionLogTable,
        
      ])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    }


  }

}
