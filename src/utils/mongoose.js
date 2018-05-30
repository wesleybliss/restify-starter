/** @module Utils/mongoose */

import mongoose from 'mongoose'
import Bluebird from 'bluebird'
import config from '../config'
import log from './logger'

// Have Mongoose use Bluebird instead of mpromise
mongoose.Promise = Bluebird

const opts = {
    /*server: {
        socketOptions: {
            socketTimeoutMS: 8 * 1000,
            connectionTimeout: 8 * 1000
        }
    }*/
}

const uriPre = config.db.uri.split(':').slice(0, 2).join(':')
let uriPost = config.db.uri.substring(uriPre.length + 1)
let uriPass = uriPost.split('@').shift()
uriPost = uriPost.substring(uriPass.length + 1)
uriPass = encodeURIComponent(uriPass)

config.db.uri = `${uriPre}:${uriPass}@${uriPost}`

log.info(`Connecting to MongoDB @ ${config.db.uri.split('@').pop()}`)

mongoose.set('debug', (coll, method, query, doc) => {
    if (config.logging.dbQueries)
        log.debug('Query executed:', coll, method, query, doc)
})

mongoose.connect(config.db.uri, opts, err => {
    
    // Fail if we can't connect to the database
    if (err) {
        log.error(err)
        if (config.failMongoOnError) throw err
    }
    
    log.info('Connected to MongoDB')
    
})

// Log errors, but hide the constant connect/disconnect messages
mongoose.connection.on('error', err => log.error(err))
mongoose.connection.on('open', () => {})
mongoose.connection.on('connected', () => {})
mongoose.connection.on('disconnected', () => {})


export default mongoose
