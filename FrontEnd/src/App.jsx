import React, {useEffect, useState} from 'react';
import AddItemForm from './AddItemForm';
import './App.css'

const App = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>Inventory Website SupraCoders</h1>
      <AddItemForm onItemAdded={handleItemAdded} />
      <h2>Items</h2>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.description} - (Quantity: {item.quantity})
            </li>
          ))
        ) : (
          <li>No items available.</li>
        )}
      </ul>
    </div>
  );
}

export default App
