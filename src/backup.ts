import { spawn } from "child_process";
import fs from "fs";
export class Backup {
  private command: string;
  private args: string[];
  private envVars: NodeJS.ProcessEnv;
  constructor(_command: string, _args: string[], _envVars: NodeJS.ProcessEnv) {
    this.command = _command;
    this.args = _args;
    this.envVars = _envVars;
  }
  run(): Promise<void> {
    return new Promise((resolve, reject) => {
      
      const child = spawn(this.command, this.args, {
        shell: false, // Necessary for Windows / PATH resolution
        env: this.envVars,
      });

      child.stdout.on("data", (data) => console.log(`stdout: ${data}`));
      child.stderr.on("data", (data) => console.log(`stderr: ${data}`));
      child.on("close", (code) => {
        if (code == 0) {
          resolve();
        } else {
          reject(new Error(`Backup failed with exit code ${code}`));
        }
      });
    });
  }
    runAndWriteToFile(outputLocation:string): Promise<void> {
    return new Promise((resolve, reject) => {
      const output=fs.createWriteStream(outputLocation);
      const child = spawn(this.command, this.args, {
        shell: false, // Necessary for Windows / PATH resolution
        env: this.envVars,
      });
      child.stdout.pipe(output);
      child.stdout.on("data", (data) => console.log(`stdout: ${data}`));
      child.stderr.on("data", (data) => console.log(`stderr: ${data}`));
      child.on("close", (code) => {
        if (code == 0) {
          resolve();
        } else {
          reject(new Error(`Backup failed with exit code ${code}`));
        }
      });
    });
  }
}
