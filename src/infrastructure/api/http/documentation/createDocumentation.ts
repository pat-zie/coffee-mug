import express, { Router } from 'express';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

export const createDocumentation = (host: string) => {
  const router = Router();

  const options = {
    failOnErrors: true,
    definition: {
      info: {
        title: 'Product & Order',
        version: '1.0.0',
      },
      host,
      basePath: '/',
    },
    apis: [
      path.join(__dirname, './documentation.js'),
    ],
  };

  const swaggerSpec = swaggerJSDoc(options);

  router.get('/swagger.json', (_: express.Request, res: express.Response): void => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  router.get('/docs', (_: express.Request, res: express.Response): void => {
    res.render('docs', { host });
  });

  return router;
}
