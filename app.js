/* eslint-disable indent */
import dotenv from 'dotenv';
import express from 'express';
import '@babel/polyfill';
import bodyParser from 'body-parser';
import routes from './server/routes';


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

routes(app);
dotenv.config();

app.get('/', (req, res) => {
    res.json({ message: 'hello world!! Your app is working' });
});


app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;