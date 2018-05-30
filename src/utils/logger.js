/** @module Utils/logger */

import winston from 'winston'
import config from '../config'

winston.emitErrs = true

console.info('Logger initializing transports for console, file')

const transports = []

if (config.logging.console)
    transports.push(new winston.transports.Console({
        level: config.logging.level,
        handleExceptions: true,
        json: false,
        colorize: true,
        prettyPrint: true
    }))

if (config.logging.file) {
    throw new Error('@todo logging to file')
    // eslint-disable-next-line no-unreachable
    transports.push(new winston.transports.File({
        // ...
    }))
}

/**
 * An instance of Winston for logging to both console and file.
 * 
 * @type {Winston}
 */
const logger = new winston.Logger({
    transports,
    exitOnError: false
})


export default logger
