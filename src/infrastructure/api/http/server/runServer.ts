import { ServerFactory } from './Server.factory';
import { Config } from '../../../../config';

export const runServer = async (config: Config): Promise<void> => {
  const { server } = await ServerFactory.create(config);

  server.listen(config.port, () => console.log(`Server is listening on port ${config.port}`));
};
