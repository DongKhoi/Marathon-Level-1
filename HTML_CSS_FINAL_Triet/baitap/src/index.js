import dotenv from 'dotenv';
import express from 'express';
import configViewEngine from './config/viewEngine';
import bodyParser from 'body-parser';
import initWesRouter from './route/wedRouter';
import path from 'path';
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
configViewEngine(app);
app.use(express.static(path.join(__dirname, 'public')));
initWesRouter(app);
// app.get('/', (req, res) => {
//     res.send('hello word!');
// });
// app.get('/about', (req, res) => {
//     res.send('about');
// });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});