
import 'dotenv/config';
import { Config } from './src/config';
import { runServer } from './src/infrastructure/api/http/server';

(async () => {
  try {
    const config: Config = {
      dbConnectionString: process.env.DB_CONNECTION_STRING!,
      dbName: process.env.DB_NAME_FOR_APP!,
      port: parseInt(process.env.PORT!, 10),
      shouldUseInMemoryDb: process.env.SHOULD_USE_IN_MEMORY_DB === 'true',
      host: process.env.HOST!,
    };

    await runServer(config);
  } catch (error) {
    console.error(error);
  }
})();
