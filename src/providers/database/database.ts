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
  isReady: Promise<any>;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.isReady = new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            this.db = db;

            this.createTables()
              .then(() => this.firstDataSet())
              .then(() => resolve())
              .catch((e) => console.log('Error: ', JSON.stringify(e, Object.getOwnPropertyNames(e))))
          })
          .catch(e => console.log('Error', e));

      });
    })

  }

  clearTables(): Promise<any> {
    const fearStatement = `delete from ` + TableName.fear;
    const fearStepStatement = `delete from ` + TableName.fearStep;
    const sessionStatement = `delete from ` + TableName.session;
    const sessionLogStatement = `delete from ` + TableName.sessionLog;

    return this.db.sqlBatch([
      sessionLogStatement,
      sessionStatement,
      fearStepStatement,
      fearStatement
    ])
      .then(() => console.log('Emptied Tables'))
      .catch(e => console.log('Error in clearTables(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));

  }

  createTables(): Promise<any> {

    const fearTable: string =
      `create table IF NOT EXISTS fear (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(32),
        description VARCHAR(256)
      )`;
    const fearStepTable: string =
      `create table IF NOT EXISTS fearStep (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(128),
        description VARCHAR(256),
        initialDegree FLOAT(2,1),
        creationDate SMALLDATETIME,
        fearId INTEGER,
        FOREIGN KEY(fearId) REFERENCES fear(id)
        )`;
    const sessionTable: string =
      `create table IF NOT EXISTS session (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number INTEGER,
        startDate SMALLDATETIME,
        endDate SMALLDATETIME,
        note VARCHAR(256),
        fearId INTEGER,
        FOREIGN KEY(fearId) REFERENCES fear(id)
        )`;
    const sessionLogTable: string =
      `create table IF NOT EXISTS sessionLog (
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

  }



  saveOrUpdateFear(data: Fear): Promise<any> {
    return this.saveOrUpdate(data, TableName.fear)
  }
  saveOrUpdateFearStep(data: FearStep): Promise<any> {
    return this.saveOrUpdate(data, TableName.fearStep)
  }
  saveOrUpdateSessionLog(data: SessionLog): Promise<any> {
    return this.saveOrUpdate(data, TableName.sessionLog)
  }
  saveOrUpdateSession(data: Session): Promise<any> {
    return this.saveOrUpdate(data, TableName.session)
  }

  saveOrUpdate(data: SessionLog | Session | FearStep | Fear, table: TableName): Promise<any> {

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
    for (let i = 0; i < count; i++) {
      if (i > 0) {
        statement += ", "
      }
      statement += "?"
    }
    statement += ")";
    console.log('count: ', count);
    console.log('paramArray: ', paramArray);
    console.log('SaveorUpdate Statement: ', statement);
    return this.db.executeSql(statement, paramArray)
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

    let statement = "DELETE FROM " + table + " WHERE id=" + id;
    return this.db.executeSql(statement)
      .catch(e => console.log('Error in delete(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));
  }

  getAllFears(): Promise<void | any[]> {

    const statement = `
      SELECT 
      *
      FROM fear
      `
    console.log('getallFears Statement', statement);
    return this.db.executeSql(statement, [])
      .then((result) => {
        let resultArray = [];
        for (let i = 0; i < result.rows.length; i++) {
          resultArray = [...resultArray, result.rows.item(i)];
        }
        return Promise.resolve(resultArray)
      })
      .catch(e => console.log('Error in getAllFears(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));

  }

  getAllFearsWithFearStep(): Promise<any> {

    const statement = `
      SELECT 
      fear.id, fear.name, fear.description,
      fearStep.id, fearStep.name, fearStep.description
      FROM fear
      LEFT JOIN fearStep ON fear.id = fearStep.fearId
      `
    return this.db.executeSql(statement)
      .then((result) => {
        /*           let structuredArray = [];
                  let currentFear: number; */
        for (let i = 0; i++; i < result.rows.length) {
          let item = result.rows.item(i);
          console.log(item);
        }
      })
      .catch(e => console.log('Error in getAllFearsWithFearStep(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));
  }


  firstDataSet(): Promise<any> {
    let countStatement = "SELECT count(*) FROM fear";
    return this.db.executeSql(countStatement, [])
      .then((result) => {
        if (result.rows.item(0)['count(*)'] < 1) {
          return this.saveOrUpdateFear({ name: 'Custom Fear', description: 'A Custom Fear to show how it works' })
            .then((result) => { 
              console.log(JSON.stringify(result));
              return { fearId: result.insertId } })
            .catch(e => console.log('Error in firstDataSet(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));
        } else {
          return Promise.reject('Did not add a fear since table is not empty' as any)
        }
      })
      .then((data: any) => {
        console.log('fearId', data.fearId)
        countStatement = "SELECT count(*) FROM fearStep";
        return this.db.executeSql(countStatement, [])
          .then((result) => {
            if (result.rows.item(0)['count(*)'] < 1) {
              return this.saveOrUpdateFearStep({
                fearId: data.fearId,
                name: 'Custom FearStep',
                description: 'A Custom FearStep to show how it works!',
                initialDegree: 7,
                creationDate: Date.now()
              })
                .then((result) => {
                  return {
                    fearId: data.fearId,
                    fearStepId: result.insertId
                  }
                })
                .catch(e => console.log('Error in firstDataSet(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));
            } else {
              return Promise.reject('Did not add a fearStep since table is not empty' as any)
            }
          })
      })
      .then((data: any) => {
        countStatement = "SELECT count(*) FROM session";
        return this.db.executeSql(countStatement, [])
          .then((result) => {
            if (result.rows.item(0)['count(*)'] < 1) {
              return this.saveOrUpdateSession({
                fearId: data.fearId,
                number: 1,
                startDate: Date.now(),
                endDate: Date.now() + 5000,
                note: 'A custom session, just to test how it works'
              })
                .then((result) => {
                  return {
                    fearId: data.fearId,
                    fearStepId: data.fearStepId,
                    sessionId: result.insertId
                  }
                })
                .catch(e => console.log('Error in firstDataSet(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));
            } else {
              return Promise.reject('Did not add a session since table is not empty' as any)
            }
          })
      })
      .then((data: any) => {
        countStatement = "SELECT count(*) FROM sessionLog";
        return this.db.executeSql(countStatement, [])
          .then((result) => {
            if (result.rows.item(0)['count(*)'] < 1) {
              return this.saveOrUpdateSessionLog({
                sessionId: data.sessionId,
                fearStepId: data.fearStepId,
                initialDegree: 6,
                endDegree: 3,
                date: Date.now() + 8000
              })
                .then((result) => 'FirstDataSet Promise Chain finished')
                .catch(e => console.log('Error in firstDataSet(): ', JSON.stringify(e, Object.getOwnPropertyNames(e))));
            } else {
              return Promise.reject('Did not add a sessionLog since table is not empty' as any)
            }
          })
      })
  }
}
