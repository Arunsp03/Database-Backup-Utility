import { Backup } from "./backup";
import path from "path"
import { getFormattedDate } from "./utils";
export class Database {
  private dbType: string;
  private dbName: string;
  private extension:string=".sql"
  private backupObj:Backup;
  constructor(_dbType: string, _dbName: string) {
    this.dbName = _dbName;
    this.dbType = _dbType;
    
  }
  async Backup ():string {
    try{
    let saveLocation:string='';
    const timeStamp=getFormattedDate();
    if (this.dbType.toLowerCase() == "postgres") {
      const destination = process.env.POSTGRESDBBACKUPSTOREDESTINATION;
      const backupCommand = process.env.POSTGRESDBBACKUPCOMMAND;
      const dbName = this.dbName;
      const dbUserName=process.env.POSTGRESDBUSER;
      const backupSaveLocation=path.join(destination,`${dbName}-${timeStamp}${this.extension}`)
      const args = ['-U', dbUserName, '-d', dbName, '-f', backupSaveLocation];
      const env= {
                ...process.env,
                PGPASSWORD: process.env.POSTGRESDBPASSWORD, // Replace with your actual DB password
              }
      this.backupObj=new Backup(backupCommand,args,env);
      await this.backupObj.run();
      saveLocation=backupSaveLocation;
            }
      
      return saveLocation;
    }
    catch(err)
    {
      throw err;
    }
    
  }
}
