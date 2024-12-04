import React, {useEffect, useState} from 'react';
import AddItemForm from './AddItemForm';
import './App.css'

const App = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);


  useEffect(() => {
  fetch('http://localhost:5000/items')
  .then((res) => res.json())
  .then((data) => setItems(data))
  .catch((err) => console.error('Error fetching items:', err)); //adding a .catch to troubleshoot
}, [])

  // useEffect(() => {   https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
  
const handleItemAdded = (newItem) => {
  setItems ((prevItems) => [...prevItems, newItem]);
};

const handleEdit = (item) => {
  setEditingItem(item);
};

const handleUpdate = (e) => {
  e.preventDefault();

  fetch(`http://localhost:5000/items/${editingItem.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editingItem), // Fixed the misplaced parentheses
  })
    .then((res) => res.json())
    .then((updatedItem) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setEditingItem(null); // Reset the editing state
    })
    .catch((err) => console.error('Error updating item:', err));
};

return (
  <div>
    <h1>Inventory Website SupraCoders</h1>
    <AddItemForm onItemAdded={handleItemAdded} />
    {editingItem ? (
      <form onSubmit={handleUpdate}>
        <h2>Edit Item</h2>
        <input
          type="text"
          value={editingItem.name}
          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
          required
        />
        <input
          type="text"
          value={editingItem.description}
          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
          required
        />
        <input
          type="number"
          value={editingItem.quantity}
          onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value, 10) })}
          required
        />
        <button type="submit">Update</button>
        <button type="button" onClick={() => setEditingItem(null)}>Cancel</button>
      </form>
    ) : (
      <>
        <h2>Items</h2>
        <ul>
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.description} - (Quantity: {item.quantity})
                <button onClick={() => handleEdit(item)}>Edit</button>
              </li>
            ))
          ) : (
            <li>No items available.</li>
          )}
        </ul>
      </>
    )}
  </div>
);
};

export default App;

