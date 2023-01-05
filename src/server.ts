import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import products_route from './handlers/products-handler'
import orders_route from './handlers/orders-handler'
import users_route from './handlers/users_handler'

const app: express.Application = express()
const port = 3000

const corsOption = {
    origin: `http://localhost:${port}`,
    optionSuccessStatus: 200,
}
// APPLY CORS
app.use(cors(corsOption))
app.use(bodyParser.json())
// Main Route
app.get('/', (_req: Request, res: Response) => {
    res.send('main page')
})
// Routes for models
products_route(app)
orders_route(app)
users_route(app)
// Listening to port 3000
app.listen(port, () => {
    console.log(`app run at http://localhost:${port}`)
})

export default app
