//https://stackoverflow.com/questions/72400422/how-does-this-expression-work-requiredotenv-config

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

app.use(cors());

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


//https://www.geeksforgeeks.org/express-js-app-post-function/

  app.post('/items', (req, res) => {
        const {itemName, description, quantity} = req.body;
    const id = items.length + 1;
    const newItem = {id, itemName, description, quantity};

    items.push(newItem)
    //https://stackoverflow.com/questions/49863783/express-res-status200-json-only-sending-json-message-how-to-retrieve-sta
    res.status(201).json({message: "Successfully Registered", status: 201})
    })




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is on ${PORT}`));
  