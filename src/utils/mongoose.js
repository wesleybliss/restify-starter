'use strict'

const config = require('../config')
const log = require('./logger')
const mongoose = require('mongoose')

// Have Mongoose use Bluebird instead of mpromise
mongoose.Promise = require('bluebird')

const opts = {
    /*server: {
        socketOptions: {
            socketTimeoutMS: 8 * 1000,
            connectionTimeout: 8 * 1000
        }
    }*/
}

log.info('Connecting to MongoDB @ ' + config.db.uri.split('@').pop())

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


module.exports = mongoose
