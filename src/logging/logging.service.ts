import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private logLevel: string;
  private logFilePath: string;
  private maxFileSizeKB: number;

  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.logFilePath = path.resolve(__dirname, '../../logs/app.log');
    this.ensureFileExists(this.logFilePath);
    this.maxFileSizeKB = parseInt(
      process.env.LOG_FILE_MAX_SIZE_KB || '1024',
      10,
    );
    this.setupLogRotation();
  }

  private ensureFileExists(filePath: string) {
    console.log('ssss');
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created log directory at ${dir}`);
    }
    if (!fs.existsSync(filePath)) {
      console.log(`Creating log file at ${filePath}`);
      fs.writeFileSync(filePath, '', { flag: 'w' });
    }
  }

  log(message: string, level: string = 'info') {
    if (this.shouldLog(level)) {
      const logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
      console.log(logMessage);
      console.log('hii');
      console.log('Log file path:', this.logFilePath);
      fs.appendFileSync(this.logFilePath, logMessage + '\n');
    }
  }

  private shouldLog(level: string): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private setupLogRotation() {
    if (fs.existsSync(this.logFilePath)) {
      const stats = fs.statSync(this.logFilePath);
      if (stats.size / 1024 > this.maxFileSizeKB) {
        const rotatedFilePath = `${this.logFilePath}.${Date.now()}`;
        fs.renameSync(this.logFilePath, rotatedFilePath);
      }
    }
  }
}
