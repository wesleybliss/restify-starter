/** @module Index */

import path from 'path'
// import dotenv from 'dotenv'
import requireAll from 'require-all'
import log from './utils/logger'
import app from './app'

// If we're not running in prod, load env vars from a file
/*if (process.env.NODE_ENV !== 'production')
    // eslint-disable-next-line global-require
    dotenv.config({
        path: path.resolve(__dirname, '../.env')
    })*/

// eslint-disable-next-line global-require
requireAll(path.resolve(__dirname, 'routes'))

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

app.listen(
    port,
    host,
    log.info(`${app.name} listening at http://${host}:${port}`)
)
