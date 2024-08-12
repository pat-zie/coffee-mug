import { Db, MongoClient } from 'mongodb';
import { Storage } from '../Storage';

export class MongoStorage implements Storage {
  private client: MongoClient;
    
  constructor(
    dbConnectionString: string,
    private readonly dbName: string,
  ) {
    this.client = new MongoClient(dbConnectionString);
  }

  public async connect(): Promise<Db> {
    await this.client.connect();

    return this.client.db(this.dbName);
  }

  public async cleanupDb(): Promise<void> {
    await this.client.db(this.dbName).dropDatabase();
  }

  public async closeDb(): Promise<void> {
    await this.client.close();
  }
}
