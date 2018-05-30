/** @module Config */

import { requireEnv } from './utils/env'

const config = {
    
    logging: {
        level: 'debug',
        console: true,
        file: false, /* False to disable, or a file path */
        dbQueries: false
    },
    
    db: {
        uri: requireEnv('UAMS_MONGODB_URI'),
        failMongoOnError: true
    }
    
}


export default config
