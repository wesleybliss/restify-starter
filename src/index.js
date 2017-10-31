'use strict'

const path = require('path')
const log = require('./utils/logger')

// If we're not running in prod, load env vars from a file
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config({
        path: path.resolve(__dirname, '../.env')
    })

const app = require('./app')

require('require-all')(path.resolve(__dirname, 'routes'))

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

app.listen(port, host, log.info(
    `${app.name} listening at http://${host}:${port}`))
