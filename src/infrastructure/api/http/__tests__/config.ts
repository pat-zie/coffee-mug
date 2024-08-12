import 'dotenv/config';
import { Config } from '../../../../config';

export const config: Config = {
  dbConnectionString: process.env.DB_CONNECTION_STRING!,
  dbName: process.env.DB_NAME_FOR_TESTS!,
  port: parseInt(process.env.PORT!, 10),
  shouldUseInMemoryDb: process.env.SHOULD_USE_IN_MEMORY_DB === 'true',
  host: process.env.HOST!,
};
