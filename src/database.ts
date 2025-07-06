import { config } from "dotenv";
import path from "path";
import { Backup } from "./backup";
import { getFormattedDate } from "./utils";
config({ path: path.resolve(__dirname, "../.env") });
export class Database {
  private dbType: string;
  private dbName: string;
  private extension:string=".sql"
  private backupObj:Backup;
  constructor(_dbType: string, _dbName: string) {
    this.dbName = _dbName;
    this.dbType = _dbType;
    
  }
  Backup() {
    const timeStamp=getFormattedDate();
    if (this.dbType.toLowerCase() == "postgres") {
      const destination = process.env.POSTGRESDBBACKUPSTOREDESTINATION;
      const backupCommand = process.env.POSTGRESDBBACKUPCOMMAND;
      const dbName = this.dbName;
      const dbUserName=process.env.POSTGRESDBUSER;
      const args = ['-U', dbUserName, '-d', dbName, '-f', destination+'/'+dbName+"-"+timeStamp+this.extension];
      this.backupObj=new Backup(backupCommand,args,dbUserName,this.dbType);
      this.backupObj.Backup();
    }
  }
}
