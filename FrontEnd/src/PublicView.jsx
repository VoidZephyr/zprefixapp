import React, { useState, useEffect } from 'react';

const PublicView = () => {
const [items, setItems] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
    fetch('http://localhost:5000/public-items')
    .then((res) => res.json())
    .then((data) => setItems(data))
    .catch((err) => setError('Failed to load public items.'));
}, []);

return (
    <div>
    <h1>Public Items</h1>
    <ul>
        {items.map((item) => (
        <li key={item.id}>
            {item.name} - {item.description} - (Quantity: {item.quantity})
            <button
            onClick={() => window.location.href = `/public-items/${item.id}`}
            >
            View Details
            </button>
        </li>
        ))}
    </ul>
    </div>
);
};

export default PublicView;