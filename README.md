# Requirements
1. Node installed (see `.nvmrc` file for version)
1. NPM package manager installed
1. Docker (with `docker-compose`) installed and enabled

# Local Development
1. Make sure that proper Node version is installed. Install the node version manually or use [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)
```
nvm use
```

2. Install dependencies
```
npm i
```

3. Set environment variables
```
npm run set-env
```

4. Setup database
```
docker-compose up -d
```

5. Build project
```
npm run build
```

6. Run automation tests
```
npm run test
```

7. Run linter
```
npm run lint
```

8. Start project
```
npm run start
```

### Important
The application is designed to use in memory storage in case of any problems with setting Mongo database. To enable the in memory storage set `SHOULD_USE_IN_MEMORY_DB` variable in `.env` file to `true`. The flag is disabled by default.

# Documentation
Documentation can be found under `/docs` endpoint. For the default config it is http://localhost:3000/docs. Use "Try it out" feature to execute a specific API endpoint.

# Future improvements
There are number of options to improve the application in the future:
- Add a logger like `winston` ([npm library](https://www.npmjs.com/package/winston))
- Change domain's `currency` to a value object and use external library like `dinero` ([npm library](https://www.npmjs.com/package/dinero.js))
- Extend the application with domain events handled by event bus ([AWS EventBridge](https://aws.amazon.com/eventbridge/))
- Introduce entities (and possibly aggregates) versioning
- Add more automation tests and measure test coverage
- more.
