/* eslint-disable indent */
import dotenv from 'dotenv';
import express from 'express';
import '@babel/polyfill';
import bodyParser from 'body-parser';
import routes from './server/routes';
import errorhandler from './server/helpers/errorhandler'
import response from './server/helpers/responses';

const app = express();
const port = process.env.NODE_PORT || 5000;


console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

// let options = {
//     explorer: true
//   };
   
// app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

routes(app);
dotenv.config();

app.get('/', (req, res) => {
    res.json({ message: 'hello world!! Your app is working' });
});

app.use((req, res) => {
    return response.handleError(405 ,'Method not allowed',res)
});

app.use((req,res) =>{
    if(!req.is('*/json')){
        return response.handleError(404, 'Not valid Json request',res)
    } 
});
app.use(errorhandler.error404);
app.use(errorhandler.error500);



app.listen(port, () => console.log(`Listening on port ${port}...`));


export default app;
