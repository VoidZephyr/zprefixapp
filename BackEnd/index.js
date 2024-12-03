//https://stackoverflow.com/questions/72400422/how-does-this-expression-work-requiredotenv-config

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
//https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is on ${PORT}`));
  