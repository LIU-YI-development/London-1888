import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use('/', routes)

export default app
