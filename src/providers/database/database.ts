import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { SessionLog } from '../../models/sessionLog.model';
import { Session } from '../../models/session.model';
import { FearStep } from '../../models/fearStep.model';
import { Fear } from '../../models/fear.model';


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
enum TableName {
  fear = 'fear',
  fearStep = 'fearStep',
  session = 'session',
  sessionLog = 'sessionLog'
}

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

  createTables(): Promise<any> {
    if (this.isReady) {
      const fearTable: string =
        `create table fear(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(32),
        description VARCHAR(256)
      )`;
      const fearStepTable: string =
        `create table fearStep(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(128),
        description VARCHAR(256),
        initialDegree FLOAT(2,1),
        creationDate SMALLDATETIME,
        fearId INTEGER,
        FOREIGN KEY(fearId) REFERENCES fear(id)
        )`;
      const sessionTable: string =
        `create table session(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number INTEGER,
        startDate SMALLDATETIME,
        endDate SMALLDATETIME,
        note VARCHAR(256),
        fearId INTEGER,
        FOREIGN KEY(fearId) REFERENCES fear(id)
        )`;
      const sessionLogTable: string =
        `create table sessionLog(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sessionId INTEGER,
        fearStepId INTEGER,
        initialDegree FLOAT(2,1),
        endDegree FLOAT(2,1),
        date SMALLDATETIME,
        note VARCHAR(256),
        FOREIGN KEY(sessionId) REFERENCES session(id),
        FOREIGN KEY(fearStepId) REFERENCES fearStep(id)
        )`;


      return this.db.sqlBatch([
        fearTable,
        fearStepTable,
        sessionTable,
        sessionLogTable
      ])
        .then(() => console.log('Created Tables'))
        .catch(e => console.log(e));
    } else {
      return Promise.reject('Could create Tables: Database is not ready')
    }
  }



  saveOrUpdateFear(data: Fear): Promise<any> {
    return this.saveOrUpdate(data,TableName.fear)
  }
  saveOrUpdateFearStep(data: FearStep): Promise<any> {
    return this.saveOrUpdate(data,TableName.fearStep)
  }
  saveOrUpdateSessionLog(data: Fear): Promise<any> {
    return this.saveOrUpdate(data,TableName.sessionLog)
  }
  saveOrUpdateSession(data: Fear): Promise<any> {
    return this.saveOrUpdate(data,TableName.session)
  }

  saveOrUpdate(data: SessionLog | Session | FearStep | Fear, table: TableName) {
    if (this.isReady) {
      let paramArray = [];
      let statement = "INSERT OR REPLACE INTO " +
        table + " (";
      let count = 0;
      for (let key in data) {
        if (count > 0) {
          statement += ", "
        }
        statement += key;
        paramArray = [...paramArray, data[key]];
        count++
      }
      statement += ") VALUES ( "
      for (let i = 0; i++; i < count) {
        if (i > 0) {
          statement += ", "
        }
        statement += "?"
      }
      statement += ")"
      return this.db.executeSql(statement,paramArray)
    } else {
      return Promise.reject('Could not save or update ' + table + ': Database is not ready')
    }

  }


firstDataSet(): Promise < any > {
  return this.db.sqlBatch([])
}
}
