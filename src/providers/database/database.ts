import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { SessionLog } from '../../models/sessionLog.model';
import { Session } from '../../models/session.model';
import { FearStep } from '../../models/fearStep.model';
import { Fear } from '../../models/fear.model';
import { Platform } from 'ionic-angular';


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

  constructor(private sqlite: SQLite, private platform: Platform) {
    console.log('Inside Constructor');
    this.platform.ready().then(() => {

      console.log('Inside Plaform Ready');
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.isReady = true;
        this.createTables()
        .then(() => this.firstDataSet())
        .catch((error) => console.log('Error in CreateTables(): ', error))
        
      })
      .catch(e => console.log('Error', e));
      
      });
    
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
        .catch(e => console.log('Error in createTables(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));
    } else {
      return Promise.reject('Could not create Tables: Database is not ready')
    }
  }



  saveOrUpdateFear(data: Fear): Promise<any> {
    return this.saveOrUpdate(data, TableName.fear)
  }
  saveOrUpdateFearStep(data: FearStep): Promise<any> {
    return this.saveOrUpdate(data, TableName.fearStep)
  }
  saveOrUpdateSessionLog(data: Fear): Promise<any> {
    return this.saveOrUpdate(data, TableName.sessionLog)
  }
  saveOrUpdateSession(data: Fear): Promise<any> {
    return this.saveOrUpdate(data, TableName.session)
  }

  saveOrUpdate(data: SessionLog | Session | FearStep | Fear, table: TableName): Promise<any> {
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
      return this.db.executeSql(statement, paramArray)
    } else {
      return Promise.reject('Could not save or update ' + table + ': Database is not ready')
    }
  }

  deleteFear(id: number): Promise<any> {
    return this.delete(id, TableName.fear)
  }

  deleteFearStep(id: number): Promise<any> {
    return this.delete(id, TableName.fearStep)
  }

  deleteSession(id: number): Promise<any> {
    return this.delete(id, TableName.session)
  }

  deleteSessionLog(id: number): Promise<any> {
    return this.delete(id, TableName.sessionLog)
  }

  delete(id: number, table: TableName): Promise<any> {
    if (this.isReady) {
      let statement = "DELETE FROM " + table + " WHERE id=" + id;
      return this.db.executeSql(statement)
    } else {
      return Promise.reject('Could not delete from ' + table + ": Database is not ready")
    }
  }

  getAllFears(): Promise<any> {
    if (this.isReady) {
      const statement = `
      SELECT 
      id, name, description
      FROM fear
      `
      return this.db.executeSql(statement)
    } else {
      return Promise.reject('Could not get all Fears: Database is not ready')
    }
  }

  getAllFearsWithFearStep(): Promise<any> {
    if (this.isReady) {
      const statement = `
      SELECT 
      fear.id, fear.name, fear.description,
      fearStep.id, fearStep.name, fearStep.description
      FROM fear
      LEFT JOIN fearStep ON fear.id = fearStep.fearId
      `
      return this.db.executeSql(statement)
        .then((result) => {
          let structuredArray = [];
          let currentFear: number;
          for (let i = 0; i++; i < result.rows.length) {
            let item = result.rows.item(i);
            console.log(item);
          }
        })
    } else {
      return Promise.reject('Could not get all Fears with FearSteps: Database is not ready')
    }
  }


  firstDataSet(): Promise<any> {
    return this.saveOrUpdateFear({ name: 'Custom Fear', description: 'A Custom Fear to show how it works'})
    .then((result) => console.log(result))
    ;
  }
}
