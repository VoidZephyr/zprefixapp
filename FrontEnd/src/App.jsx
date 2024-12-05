import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import AddItemForm from './AddItemForm';
import Login from './Login';
import './App.css'
import PublicView from './PublicView';
import PublicItemDetail from './PublicItemDetail';

const App = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);


  useEffect(() => {
  if (isLoggedIn){
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/items', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => setItems(data))
  .catch((err) => console.error('Error fetching items:', err));
}
}, [isLoggedIn, token]);

  // useEffect(() => {   https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
  
  const handleItemAdded = (newItem) => {
    setItems((prevItems) => {
      console.log('Previous items:', prevItems);
      if (!Array.isArray(prevItems)) {
        console.error('prevItems is not an array!');
        return [newItem];
      }
      return [...prevItems, newItem];
    });
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
    body: JSON.stringify(editingItem),
  })
    .then((res) => res.json())
    .then((updatedItem) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setEditingItem(null);
    })
    .catch((err) => console.error('Error updating item:', err));
};

const handleDelete = (id) => {
  fetch(`http://localhost:5000/items/${id}`, {
    method: 'DELETE',
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Failed to delete item');
    }
    return res.json();
  })
  .then(() => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  })
  .catch((err) => console.error('Error deleting item:', err));
};

const handleLogin =(token) => {
  setIsLoggedIn(true);
  setToken(userToken);
  localStorage.setItem('token', token);

  console.log('Login successful, token received:', token); // Debug log
};

console.log("Is Logged In:", isLoggedIn);

const truncateDescription = (desc) =>
    desc.length > 100 ? desc.substring(0,100) + '...' : desc;

return (
  <Router>
    <div>
      <h1>Inventory Website SupraCoders</h1>
      <Routes>
        {!isLoggedIn ? (
          <>
            {/* Public Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<PublicView />} />
            <Route path="/public-items/:id" element={<PublicItemDetail />} />
          </>
        ) : (
          <>
            {/* Logged-in User Routes */}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route
              path="/"
              element={
                <>
                  <AddItemForm onItemAdded={handleItemAdded} />
                  {editingItem ? (
                    <form onSubmit={handleUpdate}>
                      <h2>Edit Item</h2>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, name: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        value={editingItem.description}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                      <input
                        type="number"
                        value={editingItem.quantity}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            quantity: parseInt(e.target.value, 10),
                          })
                        }
                        required
                      />
                      <button type="submit">Update</button>
                      <button type="button" onClick={() => setEditingItem(null)}>
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <h2>Items</h2>
                      <ul>
                        {items.length > 0 ? (
                          items.map((item) => (
                            <li key={item.id}>
                              {item.name} -{' '}
                              {truncateDescription(item.description)} - (Quantity:{' '}
                              {item.quantity})
                              <button onClick={() => handleEdit(item)}>Edit</button>
                              <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </li>
                          ))
                        ) : (
                          <li>No items available.</li>
                        )}
                      </ul>
                    </>
                  )}
                </>
              }
            />
          </>
        )}
      </Routes>
    </div>
  </Router>
);
}

export default App;

