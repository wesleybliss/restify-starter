/** @module App */

import restify from 'restify'
import corsMiddleware from 'restify-cors-middleware'
import log from './utils/logger'
import userSchema from './schemas/user'
import mongoose from './utils/mongoose'
import UAMS from '../../uams'

const app = restify.createServer({
    name: 'Restify Starter',
    version: '1.0.0'
})

const cors = corsMiddleware({
    preflightMaxAge: 5, // Optional
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

const uams = UAMS({
    log,
    app,
    // eslint-disable-next-line global-require
    mongoose,
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


export default app
