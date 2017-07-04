
const { defaultEnv } = require('./utils/env')


const config = {
    
    logging: {
        level: 'debug',
        console: true,
        file: false /* False to disable, or a file path */
    },
    
    db: {
        host: requireEnv('UAMS_DB_HOST'),
        port: requireEnv('UAMS_DB_PORT'),
        user: requireEnv('UAMS_DB_USER'),
        pass: requireEnv('UAMS_DB_PASS'),
        name: requireEnv('UAMS_DB_NAME')
    }
    
}


module.exports = config