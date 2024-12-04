//https://stackoverflow.com/questions/72400422/how-does-this-expression-work-requiredotenv-config
//5 point score is an app.get/post/put/delete so there will be at least 4 interfaces with the database

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);


app.use(cors());

app.use(express.json());
//https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js

//needs items to display https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

const items = [
{id : 1, itemName: 'Item1', description: "blablabal", quantity: 22 },
{id : 2, itemName: 'Item2', description: "asdfasdfasdfa", quantity: 3}
]
//https://expressjs.com/en/guide/routing.html
app.get('/items', async (req, res) => {
  try {
    const items = await knex('items').select('*');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});


//https://www.geeksforgeeks.org/express-js-app-post-function/
//https://www.w3schools.com/java/java_try_catch.asp


  app.post('/items', async (req, res) => {
      const {name, description, quantity, user_id} = req.body;
      try {
    const [newItem] = await knex('items')
    .insert({name, description, quantity, user_id})
    .returning('*');
    res.status(201).json(newItem);
    }catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  })

  app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity } = req.body;
  
    try {
      console.log('Updating item with ID:', id); // Debug log
      const updated = await knex('items')
        .where({ id })
        .update(
          { name, description, quantity },
          ['id', 'name', 'description', 'quantity']
        );
  
      console.log('Query result:', updated); // Debug log
      if (!updated.length) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.json(updated[0]);
    } catch (err) {
      console.error('Error updating item:', err);
      res.status(500).json({ error: 'Failed to update item' });
    }
  });
  

app.delete('/items/:id', async (req, res) => {
  const {id} = req.params;
  try{
    const deleted = await knex('items').where({id}).del();
    if (deleted) {
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is on ${PORT}`));
  