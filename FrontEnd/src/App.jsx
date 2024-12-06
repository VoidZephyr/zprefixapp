import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";
import Login from "./Login";
import "./App.css";
import PublicView from "./PublicView";
import PublicItemDetail from "./PublicItemDetail";
import Register from "./Register";

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:5000/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((err) => console.error("Error fetching items:", err));
    }
  }, [isLoggedIn]);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/items/${editingItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
      .catch((err) => console.error("Error updating item:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const truncateDescription = (desc) =>
    desc.length > 100 ? desc.substring(0, 100) + "..." : desc;

  return (
    <div>
      <h1>Cool Guy Inventory Website</h1>
      {!isLoggedIn ? (
        <div>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PublicView />} />
            <Route path="/public-items/:id" element={<PublicItemDetail />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <div>
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
                              {item.name} - {truncateDescription(item.description)} - (
                              Quantity: {item.quantity})
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
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
