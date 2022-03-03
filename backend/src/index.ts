import bodyParser from 'body-parser';
import express from 'express';
import cookieSession from 'cookie-session';
import { router } from './requests/requests';
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({ keys: ['lkscdskchj'] }));
app.use(express.static(__dirname + "/static/"));
app.use(router);

const PORT = process.env.PORT || 80;

app.listen(PORT);