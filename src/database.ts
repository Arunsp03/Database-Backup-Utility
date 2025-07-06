import { Backup } from "./backup";
import path from "path";
import fs from "fs";
import { getFormattedDate } from "./utils";
export class Database {
  private dbType: string;
  private dbName: string;
  private extension: string = ".sql";
  private backupObj: Backup | undefined;
  private createDirectory(directory: string) {
    try {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
    } catch (err:any) {
      console.error(err);
      throw new Error(err);
    }
  }
  constructor(_dbType: string, _dbName: string) {
    this.dbName = _dbName;
    this.dbType = _dbType;
  }
  async Backup(): Promise<string> {
    try {
      let saveLocation: string = "";
      const timeStamp = getFormattedDate();
      if (this.dbType.toLowerCase() == "postgres") {
        const destination = process.env.POSTGRESDBBACKUPSTOREDESTINATION;
        const backupCommand = process.env.POSTGRESDBBACKUPCOMMAND;
        const dbName = this.dbName;
        const dbUserName = process.env.POSTGRESDBUSER;
        const password = process.env.POSTGRESDBPASSWORD;
        if (!destination || !backupCommand || !dbUserName || !password) {
          throw new Error(
            "One or more Environment variables for Postgres are not set properly"
          );
        }
        this.createDirectory(destination);
        const backupSaveLocation: string = path.join(
          destination,
          `${dbName}-${timeStamp}${this.extension}`
        );
        const args = ["-U", dbUserName, "-d", dbName, "-f", backupSaveLocation];
        const env = {
          ...process.env,
          PGPASSWORD: password, // Replace with your actual DB password
        };
        this.backupObj = new Backup(backupCommand, args, env);
        await this.backupObj.run();
        saveLocation = backupSaveLocation;
      } else if (this.dbType.toLowerCase() == "mysql") {
        console.log("db name", this.dbName);
        console.log("db type", this.dbType);

        const destination = process.env.MYSQLDBBACKUPSTOREDESTINATION;
        const backupCommand = process.env.MYSQLDBBACKUPCOMMAND;
        const dbName = this.dbName;
        const dbUserName = process.env.MYSQLDBUSER;
        const password = process.env.MYSQLDBPASSWORD;
        if (!destination || !backupCommand || !dbUserName || !password) {
          throw new Error(
            "One or more Environment variables for Mysql are not set properly"
          );
        }
        this.createDirectory(destination);
        const backupSaveLocation: string = path.join(
          destination,
          `${dbName}-${timeStamp}${this.extension}`
        );
        const args = ["-u", dbUserName, `-p${password}`, dbName];
        const env = {
          ...process.env,
          MYSQLDBPASSWORD: process.env.MYSQLDBPASSWORD,
        };
        this.backupObj = new Backup(backupCommand, args, env);
        await this.backupObj.runAndWriteToFile(backupSaveLocation);
        saveLocation = backupSaveLocation;
      }

      return saveLocation;
    } catch (err) {
      throw err;
    }
  }
}
