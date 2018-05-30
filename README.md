# Restify Starter

Base Restify API repo with [UAMS](https://github.com/wesleybliss/uams) support


## Features

- Boilerplate for environment, config, CORS, logging, MongoDB
- Simple structure with minimal dependencies
- User account management base, using [UAMS](https://github.com/wesleybliss/uams)
- PM2 starter task


## Installation

```bash
$ yarn
```


## Running

```bash
$ yarn start     // Start in development mode
$ yarn pm2       // Start PM2 for production
```


## Project Structure

```
├── package.json            ⟶ NPM scripts (start, pm2, etc.)
├── package-lock.json       ⟶ 
├── Procfile                ⟶ Heroku basic Node.js procfile
├── README.md               ⟶ 
└── src                     ⟶ 
    ├── app.js              ⟶ Main application
    ├── config.js           ⟶ Configuration
    ├── index.js            ⟶ Starting script
    ├── routes              ⟶ Route endpoints
    │   └── home.js         ⟶ Sample route
    ├── schemas             ⟶ Mongoose schema definitions
    │   └── user.js         ⟶ Sample extension of UAMS user model
    └── utils               ⟶ 
        ├── env.js          ⟶ Environment variable helper methods
        ├── logger.js       ⟶ Logging via Winston
        └── mongoose.js     ⟶ Default Mongoose setup & configs
```


---


## Donate

Buy me a scotch to say thanks & fund future development!

Bitcoin: `1MxHTKiBPTusqNaBrxcbkDyYL68tvndZ3N`

Ethereum: `0x68Df32F670E025cf3870d9021Ec6B5b4af1425DC`
