import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from '../config';


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());


app.use((req, res) => {
  res.status(404).send({
    url: `${req.originalUrl}not found`,
  });
});

app.listen(config.app.port);
