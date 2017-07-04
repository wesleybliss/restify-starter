
const { defaultEnv, requireEnv } = require('./utils/env')


const config = {
    
    logging: {
        level: 'debug',
        console: true,
        file: false, /* False to disable, or a file path */
        dbQueries: false
    },
    
    db: {
        host: requireEnv('UAMS_DB_HOST'),
        port: requireEnv('UAMS_DB_PORT'),
        user: requireEnv('UAMS_DB_USER'),
        pass: encodeURIComponent(requireEnv('UAMS_DB_PASS')),
        name: requireEnv('UAMS_DB_NAME'),
        uri: '' /* Populated below */,
        failMongoOnError: true
    }
    
}

config.db.uri = `mongodb://${config.db.user}:${config.db.pass}` +
    `@${config.db.host}:${config.db.port}/${config.db.name}`


module.exports = config