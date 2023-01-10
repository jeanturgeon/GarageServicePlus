import express from 'express';
import bodyParser  from 'body-parser';
import routesRdv from './src/routes/routesRdv.js';
import routesClient from './src/routes/routesClient.js';
import routesEmploye from './src/routes/routesEmploye.js';
import routeVehicule from './src/routes/routesVehicule.js';
import cors  from 'cors';
import dotenv from 'dotenv';

const app = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

console.log(`Your port is ${process.env.PORT} `)

routesRdv(app);
routesClient(app);
routesEmploye(app);
routeVehicule(app);

app.listen(process.env.PORT)

export default app
