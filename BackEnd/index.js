//https://stackoverflow.com/questions/72400422/how-does-this-expression-work-requiredotenv-config

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
//https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js

//needs items to display https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

const items = [
{id : 1, itemName: 'Item1', description: "blablabal", quantity: 22 },
{id : 2, itemName: 'Item2', description: "asdfasdfasdfa", quantity: 3}
]
//https://expressjs.com/en/guide/routing.html
app.get('/items', function (req, res) {
    res.send(items);
  });









const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is on ${PORT}`));
  