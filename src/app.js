'use strict'

const restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const log = require('./utils/logger')
const config = require('./config')
const userSchema = require('./schemas/user')

const app = restify.createServer({
    name:    'Restify Starter',
    version: '1.0.0'
})

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: [
        'X-Access-Token',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Headers'
    ],
    exposeHeaders: ['API-Token-Expiry']
})

app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.fullResponse())
app.use(restify.plugins.queryParser())
app.use(restify.plugins.bodyParser({ extended: true }))
app.use(restify.plugins.gzipResponse())
app.use(restify.plugins.authorizationParser())
app.pre(cors.preflight)
app.use(cors.actual)

const uams = require('../../uams')({
    log,
    app,
    mongoose: require('./utils/mongoose'),
    userField: 'email',
    passField: 'password',
    jwtTokenSecret: 'abc123',
    jwtExpiresIn: '24hr',
    excludeDbFields: [
        '__v',
        'password',
        'lastActiveAt'
    ],
    userSchema
})

app.use(uams.middleware)

app.on('InternalError', (req, res, err) => {
    log.error(err)
    res.send(err.statusCode || 500, { error: err })
})

app.use((req, res, next) => {
    log.info(req.method, req.url)
    next()
})

app.on('after', (req, res, route, err) => {
    if (err) console.error(err)
})


module.exports = app
